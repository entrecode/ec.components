const sass = require('node-sass');
const fs = require('fs');

const outFile = 'dist/default.css';

sass.render({
    file: 'scss/default.scss',
    includePaths: ['.', '../../node_modules'],
    outFile: outFile
}, function (err, result) {
    if (err) {
        console.error(err);
        return;
    }
    fs.writeFile(outFile, result.css, function (err) {
        if (!err) {
            console.log('wrote ', outFile);
            //file written on disk
        }
    });
});