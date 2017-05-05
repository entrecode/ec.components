import { ModelConfig } from './model-config';
import { Datamanager } from '../datamanager/datamanager';
import * as sinon from 'sinon';
import { muffinSchema } from '../../../mocks/data';

describe('ModelConfig', () => {

  it('should be injected', () => {
    expect(ModelConfig).toBeTruthy();
  });

  it('should be able to set and get configurations', () => {
    ModelConfig.set('duck', { fields: { name: 'Custom Name' } });
    expect(ModelConfig.get('duck').fields.name).toBe('Custom Name');
  });

  it('should generate a field config from scratch', () => {
    const s = sinon.stub(Datamanager, 'schema');
    s.returns(muffinSchema);
    return ModelConfig.generateFieldConfig('muffin').then((config) => {
      expect(config).toBeDefined();
      expect(config.hasOwnProperty('_id')).toBe(false);
      expect(config.hasOwnProperty('name')).toBe(true);
      s.restore();
    }).catch((err) => {
      s.restore();
      throw err;
    });
  })

});
