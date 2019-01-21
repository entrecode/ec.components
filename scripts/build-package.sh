cd packages/$1
npm run prepublish
# the following is also handled by yarn workspaces
# cd ../../
# sh scripts/symlink-package.sh $1