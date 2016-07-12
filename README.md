hope
======
> Warning: this is still WIP and is not useful at it's current state

hope is a modern music player built on web technologies such as ES2015, React, etc...

I've decided to write *hope* after finally giving up on finding an usable desktop music player. Recently with the raise of music streaming services, classical player are falling. 

This project follows client-server architecture. The Python based server is managing the library providers. Currently two providers are supported: *beets* for local music and *gmusic* for Google Play Music. The server also serves the media files to the browser. It also converts the file if needed on the fly. MP3 and WAV files are send as they are, but other files are losslessly  converted to WAV so they can be played in regular web browsers. The client is written in Javascript using the React libraries.
