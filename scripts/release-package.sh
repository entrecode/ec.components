#!/bin/sh

git diff-index --quiet HEAD --
lerna version --no-git-tag-version --no-push
ng test $1
ng build $1
npm publish dist/$1