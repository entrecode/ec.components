import { Collection } from '@ec.components/core';
import { mocked } from 'src/mocks/data';

describe('Collection', () => {
  it('should be constructed empty', () => {
    const collection = new Collection();
    expect(collection.items.length).toBe(0);
  });
  it('should be constructed with numbers', () => {
    const numbers = new Collection([0, 1, 2]);
    expect(numbers.items[0]).toBe(0);
    expect(numbers.items[1]).toBe(1);
    expect(numbers.items[2]).toBe(2);
    expect(numbers.items.length).toBe(3);
  });
  it('should be constructed with objects', () => {
    const people = new Collection(mocked.people);
    expect(people.items.length).toBe(3);
    expect(people.items[0].name).toBe('John');
  });
  it('should add items', () => {
    const collection = new Collection();
    collection.add('a');
    expect(collection.items[0]).toBe('a');
    expect(collection.has('a')).toBe(true);
    expect(collection.items.indexOf('a')).toBe(0);
    expect(collection.items.length).toBe(1);
    collection.add('a', true);
    expect(collection.items.length).toBe(1);
  });

  it('should remove items', () => {
    const collection = new Collection();
    collection.add('a');
    expect(collection.has('x')).toBe(false);
    collection.remove('a');
    expect(collection.has('a')).toBe(false);
    collection.remove('y');
  });
  it('should update indices', () => {
    const collection = new Collection();
    collection.add('a');
    expect(collection.items.indexOf('a')).toBe(0);
    collection.add('b');
    collection.remove('a');
    expect(collection.items.indexOf('b')).toBe(0);
  });
  it('should support addAll and removeAll', () => {
    const collection = new Collection();
    collection.addAll(['a', 'b', 'c']);
    expect(collection.items.length).toBe(3);
    collection.removeAll();
    expect(collection.items.length).toBe(0);
  });
  it('should support hasAll', () => {
    const numbers = new Collection([0, 1, 2]);
    expect(numbers.hasAll([0, 1, 2])).toBe(true);
    expect(numbers.hasAll([5, 1, 2])).toBe(false);
  });
  it('should support isEmpty', () => {
    const numbers = new Collection([0, 1, 2]);
    expect(numbers.isEmpty()).toBe(false);
    numbers.removeAll();
    expect(numbers.isEmpty()).toBe(true);
  });
});
