/**
 * Created by felix on 09.05.17.
 */
import { Form, Item } from '../../index';

describe('Form', () => {
  let person = new Item({
    name: 'Tom',
    age: 10,
    dead: false
  }, {
    fields: {
      name: {
        type: 'string'
      }, age: {
        type: 'number'
      }
    }
  });

  it('should construct empty', () => {
    const form = new Form({});
    expect(form.fields.length).toBe(0);
  });

  it('should construct with body only', () => {
    const form = new Form(person['body']);
    expect(form['body']).toBe(person['body']);
    expect(form.getProperties()).toEqual(['name', 'age', 'dead']);
    expect(form.fields.map(f => f.property)).toEqual(['name', 'age', 'dead']);
    expect(form.fields.map(f => f.type)).toEqual(['string', 'number', 'boolean']);
  });

  it('should construct with config only', () => {
    const form = new Form({}, person['config']);
    expect(form.fields.map(f => f.property)).toEqual(['name', 'age']);
    expect(form.fields.map(f => f.type)).toEqual(['string', 'number']);
  });

  it('should construct with both and config is prefered', () => {
    const form = new Form(person['body'], person['config']);
    expect(form.fields.map(f => f.property)).toEqual(['name', 'age']);
    expect(form.fields.map(f => f.type)).toEqual(['string', 'number']);
  });
});