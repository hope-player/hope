def tuples_to_library(tuples):
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
              'artistID': artist_id,
              'name': item[8],
              'albums': {}
            }
        if not album_id:
            album_id = 'gpm-album-none'
        if album_id in artist['albums']:
            album = artist['albums'][album_id]
        else:
            album = {
              'albumID': album_id,
              'name': item[5],
              'year': item[6],
              'tracks': {}
            }
        if track_id in album['tracks']:
            track = album['tracks'][track_id]
        else:
            track = {
              'trackID': track_id,
              'title': item[1],
              'disc': item[2],
              'no': item[3]
            }
        album['tracks'][track_id] = track
        artist['albums'][album_id] = album
        library[artist_id] = artist

    return library
