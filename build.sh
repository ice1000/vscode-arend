#!/bin/sh
ncu -u
npm i
convert icon.svg -size 128x128 icon.png
cp ../als/build/server/lsp.jar .
./node_modules/vsce/vsce package
