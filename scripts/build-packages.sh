mkdir node_modules/\@ec.components
sh ./scripts/build-package.sh calendar &&
sh ./scripts/build-package.sh core &&
sh ./scripts/build-package.sh ui &&
sh ./scripts/build-package.sh location &&
sh ./scripts/build-package.sh data &&
sh ./scripts/build-package.sh ace &&
sh ./scripts/build-package.sh medium-editor &&
sh ./scripts/build-package.sh tinymce &&
