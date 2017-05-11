import { Config } from '..';

describe('Config', () => {

  it('should be injected', () => {
    expect(Config).toBeTruthy();
  });

  it('should be able to configure', () => {
    Config.configure('test', 'duck', { fields: { name: 'Custom Name' } });
    expect(Config.configure('test', 'duck').fields.name).toBe('Custom Name');
  });
});
