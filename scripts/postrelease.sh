#!/bin/sh
set -e

git diff-index --quiet HEAD --
git checkout develop
npm run docs
git add -A
git commit --no-verify  -m "docs: build docs postrelease"
git checkout master
git merge --no-ff --no-verify  -m "chore: merge develop into master #postrelease" develop
git push --no-verify
git checkout develop
git push --no-verify