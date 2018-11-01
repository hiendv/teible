#!/bin/bash

if [ "$1" == "" ]; then
    echo "Missing commit message" 1>&2
    exit 1
fi

# abort on errors
set -e

# build:example
npm run build:example

cd packages/vue-teible-example/dist

git init
git add -A
git commit -m "$1"
git push -f git@github.com:hiendv/teible.git master:gh-pages

cd -
