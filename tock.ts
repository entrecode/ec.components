// import { Datamanager } from './src/packages/data/datamanager/datamanager';
import { environment } from './demo/environments/environment';
import fs = require('fs');

const str = (o) => {

  // Note: cache should not be re-used by repeated calls to JSON.stringify.
  var cache = [];
  const s = JSON.stringify(o, function (key, value) {
    if (typeof value === 'object' && value !== null) {
      if (cache.indexOf(value) !== -1) {
        // Circular reference found, discard key
        return;
      }
      // Store value in our collection
      cache.push(value);
    }
    return value;
  });
  cache = null; // Enable garbage collection
  return s;
};

// Datamanager.useEnvironment(environment);
/*
 Datamanager.api().model('muffin').entryList().then((data) => {
 console.log('data', data);
 fs.writeFileSync('tock.json', str(data))
 });
 */

// Datamanager.api().model('muffin').getSchema().then((schema) => {
//   fs.writeFileSync('tock.json', str(schema))
// });