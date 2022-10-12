#!/usr/bin/env bash

FILENAME="$1"
if test "$FILENAME" = ""; then
  FILENAME="hsbhv-extension-chr.zip"
fi
mkdir tmp_chrome
cp -r content_scripts popup tmp_chrome
cp chrome/manifest.json chrome/chrome_context_menu.js tmp_chrome
cd tmp_chrome || exit
zip -r "../$FILENAME" ./*
cd - || exit
rm -rf tmp_chrome