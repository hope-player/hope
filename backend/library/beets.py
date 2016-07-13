"""
Beets provider

TODO:
  * Get native beets library working (but do we really need it?)
"""

import sqlite3

from backend.config.config import config
from backend.library import utils


class BeetsProvider:
    """
    Beets Provider
    """
    def __init__(self):
        self.db_connection = sqlite3.connect(config['beets']['db_path'])

    def update_db(self):
        """We will implement this once we got the beets library working"""
        raise NotImplemented

    def get_library(self):
        """
        Returns the whole library in a form of a tree with this structure:
        (album)artist -> album -> track.
        """
        cursor = self.db_connection.cursor()
        cursor.execute("""
          SELECT items.id, items.title, items.disc, items.track, albums.id, albums.album, albums.year, items.mb_albumartistid, albums.albumartist
          FROM items LEFT JOIN albums ON items.album_id = albums.id
        """)
        query_result = cursor.fetchall()
        cursor.close()

        return utils.tuples_to_library(query_result)

    def get_stream(self, track_id):
        """
        Returns URL of the requested track with id=track_id.
        """
        cursor = self.db_connection.cursor()
        cursor.execute("""
          SELECT
          items.path
          FROM
          items
          WHERE
          id = ?
        """, [track_id])
        stream = cursor.fetchone()[0].decode(encoding='UTF-8')
        return 'file://' + stream
