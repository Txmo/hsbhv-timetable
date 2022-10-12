#!/usr/bin/env bash

VERSION="$1"
if test "$VERSION" = ""; then
  echo "Please pass a version as argument 1"
  exit
fi
mkdir -p versions/"$VERSION"

FF="$2"
CHR="$3"

if test "$FF" = ""; then
  FF="hsbhv-extension-ff-v$VERSION.zip"
  CHR="hsbhv-extension-chr-v$VERSION.zip"
fi

./bin/build_firefox.sh "$FF"
./bin/build_chromium.sh "$CHR"

mv "$FF" "$CHR" versions/"$VERSION"