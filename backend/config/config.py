import configparser
from os.path import expanduser

config = configparser.ConfigParser()
config.read(expanduser('~') + '/.config/hope/backend') # TODO: follow xdg variables

def available_sources():
    result = []
    for source in ['beets', 'gmusic']:
        if source in config:
            result.append(source)
    return result


if __name__ == '__main__':
    print(available_sources())
