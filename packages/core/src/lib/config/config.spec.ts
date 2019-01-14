import { Config } from '../..';

class ConfigTest extends Config { }

describe('Config', () => {

  it('should be injected', () => {
    expect(ConfigTest).toBeTruthy();
  });

  it('should be able to configure', () => {
    const config = new ConfigTest();
    config.configure('test', 'duck', { fields: { name: 'Custom Name' } });
    expect(config.configure('test', 'duck').fields.name).toBe('Custom Name');
  });
});
