#!/usr/bin/env bash

FILENAME="$1"
if test "$FILENAME" = ""; then
  FILENAME="hsbhv-extension-ff.zip"
fi
zip -r "$FILENAME" background_scripts content_scripts popup manifest.json