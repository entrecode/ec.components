cd packages/$1
npm run prepublish
cd ../../
sh scripts/symlink-package.sh $1