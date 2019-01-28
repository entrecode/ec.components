set -e

git diff-index --quiet HEAD --
git checkout develop
npm run docs
git add -A
git commit --no-verify  -m "docs: posrelease docs built"
git checkout master
git add -A
git merge --no-ff --no-verify  -m "chore: posrelease merge develop into master" develop
git checkout develop
git push --no-verify