/**
 * Created by felix on 09.05.17.
 */
import { Field } from './field';

describe('Field', () => {
  it('should construct without config', () => {
    const field = new Field('name', {});
    expect(field['property']).toBe('name');
  });

  it('should construct with config', () => {
    const field = new Field('name', { type: 'string' });
    expect(field['property']).toBe('name');
    expect(field['type']).toBe('string');
    expect(field['id']).toBeDefined();
  });
});
