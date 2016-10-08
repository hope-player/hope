#!/bin/sh
set -x

./node_modules/.bin/babel src -d dist
./node_modules/.bin/node-sass --recursive --output dist/styles --source-map true --source-map-contents src/styles
cp src/index.html dist/index.html
cp -rf src/static/fonts dist/static/fonts
