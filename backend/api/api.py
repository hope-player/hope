from flask import Flask, jsonify
from flask_cors import CORS

from backend.provider import gmusic, beets

app = Flask(__name__)
CORS(app)

gpmProvider = gmusic.GpmProvider()

@app.route("/")
def index():
    return "TODO: usage docs"


@app.route("/available_sources")
def get_available():
    return jsonify(["gmusic"])


@app.route("/library/beets")
def library_beets():
    beets_source = beets.BeetsSource()
    return jsonify(beets_source.get_library())


@app.route("/library/gmusic")
def library_gmusic():
    return jsonify(gpmProvider.get_library())

if __name__ == "__main__":
    app.run()
