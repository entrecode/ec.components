import { Item } from '../';
const collator = new Intl.Collator(undefined, { numeric: true, sensitivity: 'base' });
/** The Sorter is a singleton that handles all kinds of sorting operations. */
export abstract class Sorter<T> {
  /** Contains sorting methods for different value types. */
  static sortType = {
    'string': (a, b) => {
      return collator.compare(a, b);
    },
    'number': (a, b) => {
      return a - b
    },
    'boolean': (a, b) => {
      return a ? -1 : 1;
    }
  };

  private static getAlgorithm(items: Array<Item<any>>, property?: string): (a, b) => number {
    if (!items.length) {
      return;
    }
    if (property && !items
      .reduce((has, item) => has && item.resolve(property) !== undefined, true)) {
      console.warn('cannot sort property "' + property + '" because not all items have that property', items);
      return;
    }
    const types = items
    .map(item => typeof item.resolve(property))
    .filter((item, index, items) => items.indexOf(item) === index);
    if (types.length > 1) {
      console.warn('cannot sort items because they contain multiple types:', types);
      return;
    }
    if (!this.sortType[types[0]]) {
      console.warn('cannot sort items because no algorithm was found for type', types[0]);
      return;
    }
    return this.sortType[types[0]];
  }

  /** Sorts a given Array of items after a given property.
   * @param items Array of arbitrary content.
   * @param property Optional property to sort after (For Objects)
   * @param desc Optional Flag that will reverse sort the result (descending).
   * @param resolve Optional resolve function to expose relevant the part of object that contains
   *   the given property. */

  static sort(items: Array<Item<any>>, property?: string, desc?: boolean): Array<any> {
    const algorithm = this.getAlgorithm(items, property);
    if (!algorithm) {
      return;
    }
    items.sort((a, b) => {
      if (!property) {
        return algorithm(a.resolve(), b.resolve());
      }
      return algorithm(a.resolve(property), b.resolve(property));
    });
    if (desc) {
      items.reverse();
    }
  }
}
