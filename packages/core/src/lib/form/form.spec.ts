/**
 * Created by felix on 09.05.17.
 */
import { Form, Item } from '../..';

describe('Form', () => {
  const person = new Item({
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
    console.log('form', form);
    expect(form['body']).toBe(person['body']);
    expect(form.getProperties()).toEqual(['name', 'age', 'dead']);
    /* expect(form.fields.map(f => f.property)).toEqual(['name', 'age', 'dead']);
    expect(form.fields.map(f => f.type)).toEqual(['string', 'number', 'boolean']); */
  });

  it('should construct with config only', () => {
    const form = new Form({}, person['config']);
    expect(form.fields.map(f => f.property)).toEqual(['name', 'age']);
    expect(form.fields.map(f => f.type)).toEqual(['string', 'number']);
    expect(form.getField('name').property).toBe('name');
  });

  it('should construct with both and config is prefered', () => {
    const form = new Form(person['body'], person['config']);
    expect(form.fields.map(f => f.property)).toEqual(['name', 'age']);
    expect(form.fields.map(f => f.type)).toEqual(['string', 'number']);
  });

  it('should getValue', () => {
    const form = new Form(person['body'], person['config']);
    expect(form.getValue('name')).toBe(person.resolve('name'));
    const emptyForm = new Form(null, person['config']);
    expect(emptyForm.getValue('name')).toBeUndefined();
    const prefilledForm = new Form(null, { fields: { name: { prefill: 'prefilled' } } });
    expect(prefilledForm.getValue('name')).toBe('prefilled');
    const prefilledArray = new Form(null, { fields: { name: { prefill: ['a', 'b'] } } });
    expect(prefilledArray.getValue('name')).toEqual(['a', 'b']);
    const prefilledObject = new Form(null, { fields: { name: { prefill: { test: true } } } });
    expect(prefilledObject.getValue('name')).toEqual({ test: true });
  })
});
