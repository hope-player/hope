"""
This modules providers misc utilities.
"""

from collections import OrderedDict


def tuples_to_library(tuples, source='unknown'):
    """
    This function takes tuples (track_id, title, disc, no, album_id,
    album_name, album_year, artist_id, artist_name)
    """
    library = OrderedDict()

    for item in tuples:
        track_id = str(item[0])
        track_name = item[1]
        track_disc = item[2]
        track_no = item[3]

        album_id = str(item[4])
        album_name = item[5]
        album_year = item[6]

        artist_id = str(item[7])
        artist_name = item[8]

        if not artist_id:
            artist_id = 'unknown_artist'
            artist_name = '???'
        if artist_id in library:
            artist = library[artist_id]
        else:
            artist = {
                'id': artist_id,
                'name': artist_name,
                'type': 'artist',
                'source': source,
                'metadata': {
                    'name': artist_name
                },
                'children': {}
            }
        if not album_id:
            album_id = 'gpm-album-none'
        if album_id in artist['children']:
            album = artist['children'][album_id]
        else:
            album = {
                'id': album_id,
                'name': album_name,
                'type': 'album',
                'source': source,
                'metadata': {
                    'name': album_name,
                    'year': album_year,
                    'artist': artist_name
                },
                'children': {}
            }
        if track_id in album['children']:
            track = album['children'][track_id]
        else:
            track = {
                'id': track_id,
                'name': track_name,
                'type': 'track',
                'source': source,
                'metadata': {
                    'title': track_name,
                    'disc': track_disc,
                    'no': track_no,
                    'artist': artist_name,
                    'album': album_name
                },
                'children': {}
            }
        album['children'][track_id] = track
        artist['children'][album_id] = album
        library[artist_id] = artist

    return library
