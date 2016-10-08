#!/bin/sh
clean_exit() {
      # Get our process group id
    PGID=$(ps -o pgid= $$ | grep -o '[0-9]*')

    # Kill it in a new new process group
    setsid kill -- -$PGID
    exit 0
}

trap clean_exit SIGINT SIGTERM

mpv --idle --input-ipc-server=/tmp/hope-mpv-socket --audio-display=no --no-video --force-window=no &> /dev/null &
./node_modules/.bin/electron .

clean_exit
