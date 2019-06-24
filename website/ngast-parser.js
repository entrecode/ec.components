const ngast = require('ngast');
const fs = require('fs');

const projectPath = '../packages/ui';

const project = new ngast.ProjectSymbols(
  projectPath,
  {
    getSync: (path) => fs.readFileSync(path).toString(),
    get: (path) =>
      new Promise((resolve, reject) =>
        fs.readFile(path, (error, content) => (error ? reject(error) : resolve(content.toString()))),
      ),
  },
  (error, path) => console.error(error, path),
);

console.log('project', project);
