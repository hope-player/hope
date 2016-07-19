"""
This modules providers misc utilities.
"""

def tuples_to_library(tuples, source='unknown'):
    """
    This function takes tuples (track_id, title, disc, no, album_id,
    album_name, album_year, artist_id, artist_name)
    """
    library = {}

    for item in tuples:
        track_id = str(item[0])
        album_id = str(item[4])
        artist_id = str(item[7])

        if not artist_id:
            artist_id = 'gpm-artist-none'
        if artist_id in library:
            artist = library[artist_id]
        else:
            artist = {
                'id': artist_id,
                'name': item[8],
                'type': 'artist',
                'source': source,
                'metadata': {
                    'name': item[8]
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
                'name': item[5],
                'type': 'album',
                'source': source,
                'metadata': {
                    'name': item[5],
                    'year': item[6],
                    'artist': item[8]
                },
                'children': {}
            }
        if track_id in album['children']:
            track = album['children'][track_id]
        else:
            track = {
                'id': track_id,
                'name': item[1],
                'type': 'track',
                'source': source,
                'metadata': {
                    'title': item[1],
                    'disc': item[2],
                    'no': item[3],
                    'artist': item[8],
                    'album': item[5]
                },
                'children': {}
            }
        album['children'][track_id] = track
        artist['children'][album_id] = album
        library[artist_id] = artist

    return library
