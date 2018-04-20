#!/usr/bin/env bash
cd ./node_modules/@ec.components
#
rm -rf core
ln -s ../../packages/core
#
rm -rf ui
ln -s ../../packages/ui
#
rm -rf data
ln -s ../../packages/data
#
rm -rf style
ln -s ../../packages/style
#
rm -rf medium-editor
ln -s ../../packages/medium-editor
#
rm -rf tinymce
ln -s ../../packages/tinymce
#
rm -rf ace
ln -s ../../packages/ace
#
rm -rf location
ln -s ../../packages/location