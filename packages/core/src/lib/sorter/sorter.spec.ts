import { Item, Sorter } from '@ec.components/core/public_api';

describe('Sorter', () => {
  it('should sort numbers', () => {
    const numbers = [30, 100, 2].map(n => new Item(n));
    Sorter.sort(numbers);
    expect(numbers[0].resolve()).toEqual(2);
    expect(numbers[2].resolve()).toEqual(100);

  });

  it('should sort descending', () => {
    const numbers = [30, 100, 2].map(n => new Item(n));
    Sorter.sort(numbers, null, true);
    expect(numbers[0].resolve()).toEqual(100);
  });

  it('should sort strings', () => {
    const strings = ['bb', 'cc', 'aa'].map(n => new Item(n));
    Sorter.sort(strings);
    expect(strings[0].resolve()).toEqual('aa');
    expect(strings[2].resolve()).toEqual('cc');
  });
  it('should sort booleans', () => {
    const booleans = [true, false, true].map(n => new Item(n));
    Sorter.sort(booleans);
    expect(booleans[0].resolve()).toEqual(true);
    expect(booleans[2].resolve()).toEqual(false);
  });
});
