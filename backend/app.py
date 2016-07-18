import json

from aiohttp import web, MsgType

from backend.media import player
from backend.library import gmusic, beets
from backend.media import media
from backend.config.config import config

pl = player.Player()
providers = {
    'beets': beets.BeetsProvider,
    'gmusic': gmusic.GpmProvider
}
app = web.Application()


async def available_sources_handler(request):
    return web.Response(
        body=json.dumps(list(providers.keys())).encode('utf-8'),
        content_type='application/json')

async def library_handler(request):
    library_name = request.match_info.get('library_name', "")
    if library_name in providers:
        provider = providers[library_name]()
        library = provider.get_library()
        return web.Response(
            body=json.dumps(library).encode('utf-8'),
            content_type='application/json')
    else:
        return None

async def websocket_handler(request):
    ws = web.WebSocketResponse()
    await ws.prepare(request)

    def listener(message):
        ws.send_str(str(message))
    listener_id = pl.register_listener(listener)

    async for msg in ws:
        if msg.tp == MsgType.text:
            print(msg.data)
            rpc = json.loads(msg.data)
            method = rpc['method']
            if method == 'play':
                library_name = rpc['params'][0]
                track_id = rpc['params'][1]
                if library_name in providers:
                    provider = providers[library_name]()
                    url = provider.get_stream(track_id)
                    pl.play(url)
            elif method == 'pause':
                pl.pause()
            elif method == 'resume':
                pl.resume()
        elif msg.tp == MsgType.error:
            print('ws connection closed with exception %s' %
                  ws.exception())

    pl.unregister_listener(listener_id)
    print('websocket connection closed')

    return ws


app.router.add_route('GET', '/ws', websocket_handler)
app.router.add_route('GET', '/available_sources', available_sources_handler)
app.router.add_route('GET', '/library/{library_name}', library_handler)
app.router.add_static('/', '/home/neo/sources/hope/dist')



web.run_app(app)
