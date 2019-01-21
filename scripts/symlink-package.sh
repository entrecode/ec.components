# this is also handled by yarn workspaces.
cd node_modules/\@ec.components
rm -rf $1
ln -s ../../packages/$1/dist $1