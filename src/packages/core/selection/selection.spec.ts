import { Selection } from './selection';
import { Item } from '../item/item';

describe('Selection', () => {
  it('should select items', () => {
    const selection = new Selection();
    const a = new Item('a');
    const b = new Item('b');
    const c = new Item('c');
    expect(selection.items.length).toBe(0);
    selection.select(a);
    expect(selection.has(a)).toBe(true); //a should now be selected
    expect(selection.has(b)).toBe(false); //b was never selected
    selection.select(b, true); //solo select b
    expect(selection.has(a)).toBe(false); //a should have vanished
    expect(selection.has(b)).toBe(true);
    selection.select(c); //multi select c
    expect(selection.has(c)).toBe(true); //b should be kept
    expect(selection.has(c)).toBe(true);
  });
  it('should toggle items', () => {
    const selection = new Selection();
    const item = new Item('a');
    selection.select(item);
    expect(selection.has(item)).toBe(true);
    selection.toggle(item);
    expect(selection.has(item)).toBe(false);
  });
  it('should be able to recognize original items', () => {
    const strictSelection = new Selection();
    const item = new Item({ id: 1, name: 'original' });
    const duplicate = new Item({ id: 1, name: 'duplicate' });
    strictSelection.select(item);
    expect(strictSelection.has(item)).toBe(true);
    expect(strictSelection.has(duplicate)).toBe(false);
  });
  it('should be able to recognize items by identifier', () => {
    const tolerantSelection = new Selection([], { identifier: 'id' });
    const item = new Item({ id: 1, name: 'original' });
    const duplicate = new Item({ id: 1, name: 'duplicate' });
    tolerantSelection.select(item);
    expect(tolerantSelection.has(item)).toBe(true);
    expect(tolerantSelection.has(duplicate)).toBe(true);
  });
  it('should toggle and flip all items', () => {
    const chars = ['a', 'b', 'c'];
    const items = chars.map(item => new Item(item));
    const selection = new Selection(chars);
    expect(selection.hasAll(items)).toBe(true);
    selection.toggleAll(items);
    expect(selection.hasAll(items)).toBe(false);
    selection.addAll(items);
    expect(selection.hasAll(items)).toBe(true);
    selection.toggle(items[2]);
    expect(items.map(item => selection.has(item))).toEqual([true, true, false]);
    selection.flipAll(items);
    expect(items.map(item => selection.has(item))).toEqual([false, false, true]);
    selection.toggleAll(items);
    expect(items.map(item => selection.has(item))).toEqual([true, true, true]);
    selection.toggleAll(items);
    expect(items.map(item => selection.has(item))).toEqual([false, false, false]);
    selection.toggleAll(items);
    selection.toggle(items[0], true);
    expect(items.map(item => selection.has(item))).toEqual([true, false, false]);
    selection.toggle(items[1], true);
    expect(items.map(item => selection.has(item))).toEqual([false, true, false]);
    selection.toggle(items[1], true);
    expect(items.map(item => selection.has(item))).toEqual([false, false, false]);
  });
});
