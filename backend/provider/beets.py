# TODO: Use beets in the form of an library
import sqlite3
from backend.config.config import config

class BeetsSource:
    def __init__(self):
        self.connection = sqlite3.connect(config['beets']['db_path'])
        self.connection.row_factory = BeetsSource.dict_factory

    @staticmethod
    def dict_factory(cursor, row):
        d = {}
        for idx, col in enumerate(cursor.description):
            d[col[0]] = row[idx]
        return d

    def get_library(self):
        cursor = self.connection.cursor()
        cursor.execute("""SELECT I.title, I.albumartist, A.album FROM items I JOIN albums A ON I.album_id = A.id""")
        all_tracks = cursor.fetchall()


        _library = {}
        for track in all_tracks:
            artist = track['albumartist']
            album = track['album']
            title = track['title']

            if artist not in _library:
                _library[artist] = {"albums": {}}
            if album not in _library[artist]["albums"]:
                _library[artist]["albums"][album] = {"tracks": []}
            if title not in _library[artist]["albums"][album]["tracks"]:
                _library[artist]["albums"][album]["tracks"].append({"title": title})

        library = []
        for artist in _library.keys():
            albums = []
            for album in _library[artist]['albums'].keys():
                tracks = _library[artist]['albums'][album]['tracks']
                albums.append({'name': album, 'tracks': tracks})
            _artist = {'name': artist, 'albums': albums}
            library.append(_artist)
        return library

    def get_albumart(self):
        pass


if __name__ == '__main__':
    beets = BeetsSource()
    print(beets.get_library())
