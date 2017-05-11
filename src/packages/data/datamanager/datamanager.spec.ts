import { Datamanager } from '..';
import { mocked } from '../../../mocks/data';
import sinon = require('sinon');

describe('Datamanager', () => {

  it('should be injected', () => {
    expect(Datamanager).toBeTruthy();
  });

  it('should get DataManager from id', () => {
    const api = Datamanager.api({ id: mocked.environment.datamanagerID });
    expect(api.id).toBe(mocked.environment.datamanagerID);
  });

  it('should set Envrionment', () => {
    Datamanager.useEnvironment(mocked.environment);
    const api = Datamanager.api();
    expect(api.id).toBe(mocked.environment.datamanagerID);
  });

  /*it('should return a schema', () => {
    const s = sinon.stub(Datamanager, 'schema');
    s.returns({
      allOf: [{ properties: { mock: true } }]
    });
  });*/
});
