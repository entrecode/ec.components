import { ModelConfigService } from './model-config.service';

describe('ModelConfig', () => {

  it('should be injected', () => {
    expect(ModelConfigService).toBeTruthy();
  });

  /* it('should be able to set and get configurations', () => {
    // ModelConfig.set('duck', { fields: { name: 'Custom Name' } });
    // expect(ModelConfig.get('duck').fields.name).toBe('Custom Name');
  }); */

  // it('should generate a field config from scratch', () => {
    /*const s = sinon.stub(Datamanager, 'schema');
    s.returns(muffinSchema);*/ // TODO
    /*return ModelConfig.generateConfig('muffin').then((config) => {
      expect(config).toBeDefined();
      expect(config.hasOwnProperty('_id')).toBe(false);
      expect(config.hasOwnProperty('name')).toBe(true);
      s.restore();
    }).catch((err) => {
      s.restore();
      throw err;
    });*/
  // });

});
