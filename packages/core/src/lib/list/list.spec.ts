import { List } from '@ec.components/core';
import { mocked } from 'src/mocks/data';

describe('List', () => {
  it('should support identifiers', () => {
    const products = new List(mocked.products, { identifier: 'id' });
    expect(products.id('x1').resolve('name')).toBe('Brush');
    expect(products.id('x2').resolve('name')).toBe('Toilet');
    expect(products.id('x3').resolve('name')).toBe('Toilet Seat');
    expect(products.id('xy')).toBe(undefined);
  });

  it('should support property sorting', () => {
    const people = new List([
      { name: 'Yolanda', age: 24 },
      {
        name: 'Adam',
        age: 17,
      },
      { name: 'Terrence', age: 58 },
    ]);
    expect(people.id(0).resolve('name')).toBe('Yolanda');
    people.toggleSort('name');
    expect(people.id(0).resolve('name')).toBe('Adam');
    expect(people.id(1).resolve('name')).toBe('Terrence');
    people.toggleSort('name');
    expect(people.id(0).resolve('name')).toBe('Yolanda');
    expect(people.id(1).resolve('name')).toBe('Terrence');
    people.toggleSort('age');
    expect(people.config.desc).toBe(false);
    expect(people.id(0).resolve('age')).toBe(17);
    people.toggleSort('age');
    expect(people.config.desc).toBe(true);
    expect(people.id(0).resolve('age')).toBe(58);
    expect(people.isSorted('age')).toBe(true);
    expect(people.isSorted('age', true)).toBe(true);
    expect(people.isSorted('age', false)).toBe(false);
    expect(people.isSorted('name')).toBe(false);
  });
  it('should support resolve functions', () => {
    const muffins = new List(mocked.muffins, { resolve: (m) => m.value });
    expect(muffins.items[0].resolve('name')).toBe('Vanilla Fudge');
    expect(muffins.id(0).resolve('name')).toBe('Vanilla Fudge');
  });
  it('should support identifiers in combination with resolve', () => {
    const muffins = new List(mocked.muffins, { identifier: 'name', resolve: (m) => m.value });
    const fudge = muffins.id('Vanilla Fudge');
    expect(muffins.id('Vanilla Fudge').resolve('name')).toBe('Vanilla Fudge');
  });
  it('should support sorting with resolve functions', () => {
    const muffins = new List(mocked.muffins, { resolve: (m) => m.value });
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
});
