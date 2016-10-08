#!/bin/sh
./node_modules/.bin/babel src -d dist --watch &
./node_modules/.bin/node-sass --watch --recursive --output dist/styles --source-map true --source-map-contents src/styles &
