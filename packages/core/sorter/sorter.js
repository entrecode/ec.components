"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var collator = new Intl.Collator(undefined, { numeric: true, sensitivity: 'base' });
function sortString(a, b) {
    return collator.compare(a, b);
}
exports.sortString = sortString;
function sortNumber(a, b) {
    return a - b;
}
exports.sortNumber = sortNumber;
function sortBoolean(a, b) {
    return a ? -1 : 1;
}
exports.sortBoolean = sortBoolean;
/** The Sorter is a singleton that handles all kinds of sorting operations. */
var Sorter = /** @class */ (function () {
    function Sorter() {
    }
    /** Returns the sorting algorithm for the given item array. */
    Sorter.getAlgorithm = function (items, property) {
        if (!items.length) {
            return;
        }
        if (property && !items
            .reduce(function (has, item) { return has && item.sort(property) !== undefined; }, true)) {
            console.warn('cannot sort property "' + property + '" because not all items have that property', items);
            return;
        }
        var types = items
            .map(function (item) { return typeof item.sort(property); })
            .filter(function (item, index, _items) { return _items.indexOf(item) === index; });
        if (types.length > 1) {
            console.warn('cannot sort items because they contain multiple types:', types);
            return;
        }
        if (!this.sortType[types[0]]) {
            console.warn('cannot sort items because no algorithm was found for type', types[0]);
            return;
        }
        return this.sortType[types[0]];
    };
    /** Sorts a given Array of items after a given property.
     * @param items Array of arbitrary content.
     * @param property Optional property to sort after (For Objects)
     * @param desc Optional Flag that will reverse sort the result (descending).
     * @param resolve Optional resolve function to expose relevant the part of object that contains
     *   the given property. */
    Sorter.sort = function (items, property, desc) {
        var algorithm = this.getAlgorithm(items, property);
        if (!algorithm) {
            return;
        }
        items.sort(function (a, b) {
            if (!property) {
                return algorithm(a.resolve(), b.resolve());
            }
            return algorithm(a.sort(property), b.sort(property));
        });
        if (desc) {
            items.reverse();
        }
    };
    /** Contains sorting methods for different value types. */
    Sorter.sortType = {
        'string': sortString,
        'number': sortNumber,
        'boolean': sortBoolean
    };
    return Sorter;
}());
exports.Sorter = Sorter;
