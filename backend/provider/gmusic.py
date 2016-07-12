"""
Gmusic provider supports both free and all-access accounts.
In the [gmusic] section in the configuration, one can set username, password,
device_id and database location.

TODO:
  * Store more information about library items

BUGS:
  * Various artists albums broken
"""

from collections import defaultdict
import sqlite3

from gmusicapi import Mobileclient, exceptions as GMPExceptions
from backend.config.config import config


class GpmProvider:
    """
    Google Play Music Provider.
    We store the library in local database, which is periodically updated. It
    has several advantages. Firstly, there is a smaller chance, that Google will
    get pissed off if we keep the communication at minimum.
    Another nice feature is that all requests are significantly faster.
    """
    def __init__(self):
        """
        In the constructor we login to gpm and open the connection
        to the database.
        """
        self.gpm = Mobileclient()
        self.gpm.login(
            config['gmusic']['login'],
            config['gmusic']['password'],
            config['gmusic']['key'])
        self.db_connection = sqlite3.connect(config['gmusic']['db_path'])
        self._create_db()

    def _create_db(self):
        cursor = self.db_connection.cursor()
        cursor.execute("""
            CREATE TABLE IF NOT EXISTS track
            (
                trackID TEXT PRIMARY KEY,
                title TEXT NOT NULL,
                disc INTEGER,
                no INTEGER,
                albumID TEXT,
                FOREIGN KEY(albumID) REFERENCES album(albumID)
            )
        """)
        cursor.execute("""
            CREATE TABLE IF NOT EXISTS artist
            (
                artistID TEXT PRIMARY KEY,
                name TEXT NOT NULL
            )
        """)
        cursor.execute("""
            CREATE TABLE IF NOT EXISTS album
            (
                albumID TEXT PRIMARY KEY,
                name TEXT NOT NULL,
                year TEXT
            )
        """)
        cursor.execute("""
            CREATE TABLE IF NOT EXISTS trackArtist
            (
                trackID TEXT,
                artistID TEXT,
                PRIMARY KEY (trackID, artistID),
                FOREIGN KEY(trackID) REFERENCES track(trackID),
                FOREIGN KEY(artistID) REFERENCES artist(artistID)
            )
        """)
        cursor.execute("""
            CREATE TABLE IF NOT EXISTS albumArtist
            (
                albumID TEXT,
                artistID TEXT,
                PRIMARY KEY (albumID, artistID),
                FOREIGN KEY(albumID) REFERENCES album(albumID),
                FOREIGN KEY(artistID) REFERENCES artist(artistID)
            )
            """)
        cursor.close()

    def _add_tracks(self, tracks):
        cursor = self.db_connection.cursor()
        cursor.executemany(
            "INSERT OR IGNORE INTO track VALUES (?, ?, ?, ?, ?)",
            tracks
        )
        cursor.close()
        self.db_connection.commit()

    def _add_albums(self, albums):
        cursor = self.db_connection.cursor()
        cursor.executemany(
            "INSERT OR IGNORE INTO album VALUES (?, ?, ?)",
            albums
        )
        cursor.close()
        self.db_connection.commit()

    def _get_album_id(self, album_id):
        try:
            return self.gpm.get_album_info(album_id, include_tracks=False)
        except GMPExceptions.CallFailure:
            # gpm didn't return a valid response
            return None
        except ValueError:
            # we didn't provide a valid id
            return None

    def _add_artists(self, artists):
        cursor = self.db_connection.cursor()
        cursor.executemany(
            "INSERT OR IGNORE INTO artist VALUES (?, ?)",
            artists
        )
        cursor.close()
        self.db_connection.commit()

    def _get_artist_id(self, artist_id):
        try:
            return self.gpm.get_artist_info(artist_id, include_albums=False, max_rel_artist=0, max_top_tracks=0)
        except GMPExceptions.CallFailure:
            # gpm didn't return a valid response
            return None
        except ValueError:
            # we didn't provide a valid id
            return None

    def _add_track_artists(self, track_artists):
        cursor = self.db_connection.cursor()
        cursor.executemany("INSERT OR IGNORE INTO trackArtist VALUES (?, ?)", track_artists)
        cursor.close()
        self.db_connection.commit()

    def _add_album_artists(self, album_artists):
        cursor = self.db_connection.cursor()
        cursor.executemany("INSERT OR IGNORE INTO albumArtist VALUES (?, ?)", album_artists)
        cursor.close()
        self.db_connection.commit()

    def _update_tracks(self):
        all_tracks = self.gpm.get_all_songs()
        tracks = []
        track_artists = []
        for track in all_tracks:
            tracks.append(
                (track.get('id'), track.get('title'),
                 track.get('discNumber'), track.get('trackNumber'),
                 track.get('albumId')))
            artist_ids = track.get('artistId')
            if not artist_ids:
                continue
            for artist_id in artist_ids:
                track_artists.append((track['id'], artist_id))
        self._add_tracks(tracks)
        self._add_track_artists(track_artists)

    def _update_albums(self):
        cursor = self.db_connection.cursor()
        cursor.execute(
            "SELECT DISTINCT albumID FROM track"
        )
        result = [album[0] for album in cursor.fetchall()]
        albums = []
        album_artists = []
        for album_id in result:
            album = self._get_album_id(album_id)
            if not album:
                continue
            albums.append((album['albumId'], album['name'], album['year']))
            artist_ids = album.get('artistId')
            if not artist_ids:
                continue
            for artist_id in album.get('artistId'):
                album_artists.append((album_id, artist_id))
        self._add_albums(albums)
        self._add_album_artists(album_artists)

    def _update_artists(self):
        cursor = self.db_connection.cursor()
        cursor.execute(
            """
            SELECT DISTINCT artistID FROM trackArtist
            UNION SELECT DISTINCT artistID from albumArtist
            """
        )
        result = [artist[0] for artist in cursor.fetchall()]
        artists = []
        for artist_id in result:
            artist = self._get_artist_id(artist_id)
            if not artist:
                continue
            artists.append((artist['artistId'], artist['name']))
        self._add_artists(artists)

    def update_db(self):
        """
        Updates the local database with an actual library from gpm.
        It updates the library from the tracks to up.
        """
        # The order matters
        self._update_tracks()
        self._update_albums()
        self._update_artists()

    def get_library(self):
        """
        Returns the whole library in a form of a tree with this structure:
        (album)artist -> album -> track.
        """
        cursor = self.db_connection.cursor()
        cursor.execute("""
          SELECT trackID, title, disc, no, album.albumID, album.name, year, artist.artistID, artist.name
          FROM track
          JOIN album  ON track.albumID = album.albumID
          JOIN albumArtist ON track.albumID = albumArtist.albumID
          JOIN artist ON albumArtist.artistID = artist.artistID
          UNION
          SELECT track.trackID, title, disc, no, NULL, NULL, NULL, artist.artistID, artist.name
          FROM track
          LEFT NATURAL JOIN album
          LEFT JOIN trackArtist ON track.trackID = trackArtist.trackID
          LEFT JOIN artist ON trackArtist.artistID = artist.artistID
          WHERE album.albumID IS NULL
        """)
        query_result = cursor.fetchall()

        library = {}
        for fetched in query_result:
            track_id = fetched[0]
            album_id = fetched[4]
            artist_id = fetched[7]

            if not artist_id:
                artist_id = 'gpm-artist-none'
            if artist_id in library:
                artist = library[artist_id]
            else:
                artist = {
                  'artistID': artist_id,
                  'name': fetched[8],
                  'albums': {}
                }
            if not album_id:
                album_id = 'gpm-album-none'
            if album_id in artist['albums']:
                album = artist['albums'][album_id]
            else:
                album = {
                  'albumID': album_id,
                  'name': fetched[5],
                  'year': fetched[6],
                  'tracks': {}
                }
            if track_id in album['tracks']:
                track = album['tracks'][track_id]
            else:
                track = {
                  'trackID': track_id,
                  'title': fetched[1],
                  'disc': fetched[2],
                  'no': fetched[3]
                }
            album['tracks'][track_id] = track
            artist['albums'][album_id] = album
            library[artist_id] = artist
        cursor.close()
        return library

    def get_stream(self, track_id):
        """
        Returns URL of the requested track with id=track_id.
        """
        return self.gpm(track_id)
