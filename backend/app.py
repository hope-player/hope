"""
This module does run a server for the hope player.
"""

import json

from aiohttp import web, MsgType

from backend.media.player import Player
from backend.library import gmusic, beets

PLAYER = Player()
PROVIDERS = {
    'beets': beets.BeetsProvider,
    'gmusic': gmusic.GpmProvider
}
APP = web.Application()


async def available_sources_handler(_):
    """
    This function returns available providers.
    """
    return web.Response(
        body=json.dumps(list(PROVIDERS.keys())).encode('utf-8'),
        content_type='application/json')

async def library_handler(request):
    """
    This function returns the library for library_name specified
    in the request.
    """
    library_name = request.match_info.get('library_name', "")
    if library_name in PROVIDERS:
        provider = PROVIDERS[library_name]()
        library = provider.get_library()
        return web.Response(
            body=json.dumps(library).encode('utf-8'),
            content_type='application/json')
    else:
        return None

async def websocket_handler(request):
    """
    This function handles the websocket connection.
    It allows to control the PLAYER and is sending any events from the PLAYER.
    """
    socket = web.WebSocketResponse()
    await socket.prepare(request)

    def _listener(message):
        socket.send_str(str(message))
    listener_id = PLAYER.register_listener(_listener)

    async for msg in socket:
        if msg.tp == MsgType.text:
            print(msg.data)
            rpc = json.loads(msg.data)
            method = rpc['method']
            if method == 'play':
                PLAYER.pause()
                library_name = rpc['params'][0]
                track_id = rpc['params'][1]
                if library_name in PROVIDERS:
                    provider = PROVIDERS[library_name]()
                    url = provider.get_stream(track_id)
                    PLAYER.play(url)
            elif method == 'pause':
                PLAYER.pause()
            elif method == 'resume':
                PLAYER.resume()
        elif msg.tp == MsgType.error:
            print('ws connection closed with exception %s' %
                  socket.exception())

    PLAYER.unregister_listener(listener_id)
    print('websocket connection closed')

    return socket


APP.router.add_route('GET', '/ws', websocket_handler)
APP.router.add_route('GET', '/available_sources', available_sources_handler)
APP.router.add_route('GET', '/library/{library_name}', library_handler)
APP.router.add_static('/', '/home/neo/sources/hope/dist')



web.run_app(APP)
