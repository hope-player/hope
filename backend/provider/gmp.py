from gmusicapi import Mobileclient
from backend.config.config import config

class GMPSource:
    def __init__(self):
        self.api = Mobileclient()
        self.api.login(
            config['gmusic']['login'],
            config['gmusic']['password'],
            config['gmusic']['key']
        )

    def get_library(self):
        all_tracks = self.api.get_all_songs()
        _library = {}
        for track in all_tracks:
            if track['albumArtist']:
                artist = track['albumArtist']
            else:
                artist = track['artist']
            album = track['album']
            title = track['title']
            if 'artistArtRef' in track:
                art = track['artistArtRef'][0]['url']
            else:
                track['artistArtRef'] = ''

            if artist not in _library:
                _library[artist] = {"albums": {}}
            if album not in _library[artist]["albums"]:
                _library[artist]["albums"][album] = {"coverArt": art, "tracks": []}
            if title not in _library[artist]["albums"][album]["tracks"]:
                _library[artist]["albums"][album]["tracks"].append({"title": title})

        library = []
        for artist in _library.keys():
            albums = []
            for album in _library[artist]['albums'].keys():
                tracks = _library[artist]['albums'][album]['tracks']
                albums.append({'name': album, 'coverArt': _library[artist]['albums'][album]['coverArt'], 'tracks': tracks})
            _artist = {'name': artist, 'albums': albums}
            library.append(_artist)
        return library


if __name__ == '__main__':
    gmp = GMPSource()
    print(gmp.get_library())
