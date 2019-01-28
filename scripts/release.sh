#!/bin/sh
set -e

# npm run prerelease

lerna publish --contents dist --conventional-commits

npm run postrelease