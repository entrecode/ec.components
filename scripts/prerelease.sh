#!/bin/sh
set -e

git diff-index --quiet HEAD --
git checkout develop
npm run test-packages
