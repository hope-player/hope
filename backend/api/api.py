from flask import Flask, jsonify, send_from_directory
from flask_cors import CORS, cross_origin

from backend.library import gmusic, beets
from backend.media import media
from backend.config.config import config

app = Flask(__name__)
CORS(app)

mStore = media.MediaStore()
providers = {
    'beets': beets.BeetsProvider,
    'gmusic': gmusic.GpmProvider
}


@app.route("/app/<string:location>")
def index(location='index.html'):
    return send_from_directory('/home/neo/sources/hope/dist',
                               location)


@app.route("/available_sources")
def get_available():
    return jsonify(list(providers.keys()))


@app.route("/library/<string:library_name>")
def get_library(library_name):
    if library_name in providers:
        provider = providers[library_name]()
        library = provider.get_library()
        return jsonify(library)
    else:
        return None


@app.route("/media/add/<string:library_name>/<string:track_id>")
def add_media(library_name, track_id):
    if library_name in providers:
        provider = providers[library_name]()
        url = provider.get_stream(track_id)
        mStore.add_to_store(library_name, track_id, url)
        return "ok"
    else:
        return "ko"


@app.route("/media/stream/<string:library_name>/<string:track_id>")
def get_media(library_name, track_id):
    if library_name in providers:
        location = mStore.get_from_store(library_name, track_id)
        return send_from_directory(config['media']['tmp'], location)
    else:
        return "ko"


if __name__ == "__main__":
    app.run(debug=True)
