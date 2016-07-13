"""
This module is serving media files.
"""

from pathlib import Path
import urllib.request

from backend.config.config import config


class MediaStore:
    """
    Media Store.
    We store multimedia files in a temporary location specified in config
    and serve them if requested.
    """
    def __init__(self):
        self.tmp_location = Path(config['media']['tmp'])
        self.store = {}
        self.counter = 0

    def add_to_store(self, source, track_id, url):
        if (source, track_id) in self.store:
            old_value = self.store[(source, track_id)]
            self.store[(source, track_id)] = (old_value[0], old_value[1]+1)
            return old_value[0]
        else:
            self.counter += 1
            location = str(self.counter) + ".mp3"
            urllib.request.urlretrieve(url, str(self.tmp_location / location))
            self.store[(source, track_id)] = (location, 1)
            return location

    def get_from_store(self, source, track_id):
        result = self.store.get((source, track_id))
        if result:
            return result[0]
        else:
            return None

    def removeFromStore(self, source, track_id):
        pass
