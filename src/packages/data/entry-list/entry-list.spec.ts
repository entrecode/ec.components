import { EntryList } from './entry-list';
import { Datamanager } from '../datamanager/datamanager';
import { muffinList, muffinSchema } from '../../../mocks/muffins';
import sinon = require('sinon');

describe('EntryList', () => {
  it('should construct', () => {
    const s = sinon.stub(Datamanager.api(), 'model');
    s.returns({
      entryList: (config) => {
        return Promise.resolve(muffinList);
      },
      getSchema: () => {
        return Promise.resolve(muffinSchema);
      }
    });
    const muffins = new EntryList('muffin', {});
    return muffins['load']().then(() => {
      expect(muffins.items.length).toBe(muffinList.entries.length);
    });
  });
});