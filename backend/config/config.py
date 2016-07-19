"""
This module manages application config.

TODO:
 * read config folder location from system variables
"""

import configparser
from os.path import expanduser

CONFIG = configparser.ConfigParser()
CONFIG.read(expanduser('~') + '/.config/hope/backend')

def available_sources():
    """
    Return the list of activated source providers.
    """
    result = []
    for source in ['beets', 'gmusic']:
        if source in CONFIG:
            result.append(source)
    return result
