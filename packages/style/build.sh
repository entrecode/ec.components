rm -rf dist
mkdir dist
node build-sass.js
cp package.json dist/package.json
cp README.md dist/README.md
cp -R scss dist/scss