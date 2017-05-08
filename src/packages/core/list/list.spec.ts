import { List } from './list';
import { mocked } from '../../../mocks/data';
describe('List', () => {

  it('should support identifiers', () => {
    const products = new List(mocked.products, { identifier: 'id' });
    expect(products.id('x1').resolve('name')).toBe('Brush');
    expect(products.id('x2').resolve('name')).toBe('Toilet');
    expect(products.id('x3').resolve('name')).toBe('Toilet Seat');
    expect(products.id('xy')).toBe(undefined);
  });

  it('should throw an error when using id without identifier set', () => {
    const products = new List(mocked.products);
    expect(() => {
      products.id('x1')
    }).toThrow();
  });

  it('should support property sorting', () => {
    const people = new List([{ name: 'Yolanda' }, { name: 'Adam' }, { name: 'Terrence' }]);
    expect(people.id(0).resolve('name')).toBe('Yolanda');
    people.toggleSort('name');
    expect(people.id(0).resolve('name')).toBe('Adam');
    expect(people.id(1).resolve('name')).toBe('Terrence');
    people.toggleSort('name');
    expect(people.id(0).resolve('name')).toBe('Yolanda');
    expect(people.id(1).resolve('name')).toBe('Terrence');
  });
  it('should support resolve functions', () => {
    const muffins = new List(mocked.muffins, { resolve: m => m.value });
    expect(muffins.items[0].resolve('name')).toBe('Vanilla Fudge');
    expect(muffins.id(0).resolve('name')).toBe('Vanilla Fudge');
  });
  it('should support identifiers in combination with resolve', () => {
    const muffins = new List(mocked.muffins, { identifier: 'name', resolve: m => m.value });
    const fudge = muffins.id('Vanilla Fudge');
    expect(muffins.id('Vanilla Fudge').resolve('name')).toBe('Vanilla Fudge');
  });
  it('should support sorting with resolve functions', () => {
    const muffins = new List(mocked.muffins, { resolve: m => m.value });
    muffins.toggleSort('cost');
    expect(muffins.items[0].resolve('cost')).toBe(5);
    muffins.toggleSort('cost');
    expect(muffins.items[0].resolve('cost')).toBe(15);
  });
  it('should support grouping', () => {
    const muffins = new List([{ name: 'A' }, { name: 'A' }, { name: 'B' }], { fields: { name: { group: (v) => v } } });
    muffins.groupBy('name');
    expect(muffins.groups.length).toBe(2);
  });
  it('should generate unique group ids for tracking', () => {
    const muffins = new List([{ name: 'A' }, { name: 'A' }, { name: 'B' }], { fields: { name: { group: (v) => v } } });
    muffins.groupBy('name');
    const ids = muffins.groups.map((muffin, index) => {
      return muffins['trackGroup'](index, muffin);
    });
    expect(ids[0] !== ids[1] && ids[1] !== ids[2] && ids[2] !== ids[0]).toBeTruthy();
  });
  it('should support groupFilter', () => {
    const muffins = new List([{ name: 'A' }, { name: 'A' }, { name: 'B' }], { fields: { name: { group: (v) => v } } });
    muffins.toggleSort('name');
    expect(muffins['groupFilter']('xyz')).toEqual({
      property: 'name',
      value: 'xyz'
    });
  })
});
