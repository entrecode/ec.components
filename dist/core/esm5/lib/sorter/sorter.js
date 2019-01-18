/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
/**
 * Used for natural sorting of strings
 * @type {?}
 */
var collator = new Intl.Collator(undefined, { numeric: true, sensitivity: 'base' });
/**
 * Sorts strings (naturally)
 * @param {?} a
 * @param {?} b
 * @return {?}
 */
export function sortString(a, b) {
    return collator.compare(a, b);
}
/**
 * Sorts numbers
 * @param {?} a
 * @param {?} b
 * @return {?}
 */
export function sortNumber(a, b) {
    return a - b;
}
/**
 * Sorts booleans
 * @param {?} a
 * @param {?} b
 * @return {?}
 */
export function sortBoolean(a, b) {
    return a ? -1 : 1;
}
/**
 * The Sorter is a singleton that handles all kinds of sorting operations.
 * @abstract
 * @template T
 */
var Sorter = /** @class */ (function () {
    function Sorter() {
    }
    /** Returns the sorting algorithm for the given item array. */
    /**
     * Returns the sorting algorithm for the given item array.
     * @private
     * @param {?} items
     * @param {?=} property
     * @return {?}
     */
    Sorter.getAlgorithm = /**
     * Returns the sorting algorithm for the given item array.
     * @private
     * @param {?} items
     * @param {?=} property
     * @return {?}
     */
    function (items, property) {
        if (!items.length) {
            return;
        }
        if (property && !items
            .reduce(function (has, item) { return has && item.sort(property) !== undefined; }, true)) {
            console.warn('cannot sort property "' + property + '" because not all items have that property', items);
            return;
        }
        /** @type {?} */
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
    /**
     * Sorts a given Array of items after a given property.
     * @param {?} items Array of arbitrary content.
     * @param {?=} property Optional property to sort after (For Objects)
     * @param {?=} desc Optional Flag that will reverse sort the result (descending).
     * @return {?}
     */
    Sorter.sort = /**
     * Sorts a given Array of items after a given property.
     * @param {?} items Array of arbitrary content.
     * @param {?=} property Optional property to sort after (For Objects)
     * @param {?=} desc Optional Flag that will reverse sort the result (descending).
     * @return {?}
     */
    function (items, property, desc) {
        /** @type {?} */
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
    /**
     * Contains sorting methods for different value types.
     */
    Sorter.sortType = {
        'string': sortString,
        'number': sortNumber,
        'boolean': sortBoolean
    };
    return Sorter;
}());
export { Sorter };
if (false) {
    /**
     * Contains sorting methods for different value types.
     * @type {?}
     */
    Sorter.sortType;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic29ydGVyLmpzIiwic291cmNlUm9vdCI6Im5nOi8vQGVjLmNvbXBvbmVudHMvY29yZS8iLCJzb3VyY2VzIjpbImxpYi9zb3J0ZXIvc29ydGVyLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7O0lBR00sUUFBUSxHQUFHLElBQUksSUFBSSxDQUFDLFFBQVEsQ0FBQyxTQUFTLEVBQUUsRUFBRSxPQUFPLEVBQUUsSUFBSSxFQUFFLFdBQVcsRUFBRSxNQUFNLEVBQUUsQ0FBQzs7Ozs7OztBQUdyRixNQUFNLFVBQVUsVUFBVSxDQUFDLENBQUMsRUFBRSxDQUFDO0lBQzdCLE9BQU8sUUFBUSxDQUFDLE9BQU8sQ0FBQyxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUM7QUFDaEMsQ0FBQzs7Ozs7OztBQUdELE1BQU0sVUFBVSxVQUFVLENBQUMsQ0FBQyxFQUFFLENBQUM7SUFDN0IsT0FBTyxDQUFDLEdBQUcsQ0FBQyxDQUFDO0FBQ2YsQ0FBQzs7Ozs7OztBQUdELE1BQU0sVUFBVSxXQUFXLENBQUMsQ0FBQyxFQUFFLENBQUM7SUFDOUIsT0FBTyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7QUFDcEIsQ0FBQzs7Ozs7O0FBR0Q7SUFBQTtJQXVEQSxDQUFDO0lBOUNDLDhEQUE4RDs7Ozs7Ozs7SUFDL0MsbUJBQVk7Ozs7Ozs7SUFBM0IsVUFBNEIsS0FBdUIsRUFBRSxRQUFpQjtRQUNwRSxJQUFJLENBQUMsS0FBSyxDQUFDLE1BQU0sRUFBRTtZQUNqQixPQUFPO1NBQ1I7UUFDRCxJQUFJLFFBQVEsSUFBSSxDQUFDLEtBQUs7YUFDbkIsTUFBTSxDQUFDLFVBQUMsR0FBRyxFQUFFLElBQUksSUFBSyxPQUFBLEdBQUcsSUFBSSxJQUFJLENBQUMsSUFBSSxDQUFDLFFBQVEsQ0FBQyxLQUFLLFNBQVMsRUFBeEMsQ0FBd0MsRUFBRSxJQUFJLENBQUMsRUFBRTtZQUN4RSxPQUFPLENBQUMsSUFBSSxDQUFDLHdCQUF3QixHQUFHLFFBQVEsR0FBRyw0Q0FBNEMsRUFBRSxLQUFLLENBQUMsQ0FBQztZQUN4RyxPQUFPO1NBQ1I7O1lBQ0ssS0FBSyxHQUFHLEtBQUs7YUFDaEIsR0FBRyxDQUFDLFVBQUEsSUFBSSxJQUFJLE9BQUEsT0FBTyxJQUFJLENBQUMsSUFBSSxDQUFDLFFBQVEsQ0FBQyxFQUExQixDQUEwQixDQUFDO2FBQ3ZDLE1BQU0sQ0FBQyxVQUFDLElBQUksRUFBRSxLQUFLLEVBQUUsTUFBTSxJQUFLLE9BQUEsTUFBTSxDQUFDLE9BQU8sQ0FBQyxJQUFJLENBQUMsS0FBSyxLQUFLLEVBQTlCLENBQThCLENBQUM7UUFDbEUsSUFBSSxLQUFLLENBQUMsTUFBTSxHQUFHLENBQUMsRUFBRTtZQUNwQixPQUFPLENBQUMsSUFBSSxDQUFDLHdEQUF3RCxFQUFFLEtBQUssQ0FBQyxDQUFDO1lBQzlFLE9BQU87U0FDUjtRQUNELElBQUksQ0FBQyxJQUFJLENBQUMsUUFBUSxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUMsQ0FBQyxFQUFFO1lBQzVCLE9BQU8sQ0FBQyxJQUFJLENBQUMsMkRBQTJELEVBQUUsS0FBSyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7WUFDcEYsT0FBTztTQUNSO1FBQ0QsT0FBTyxJQUFJLENBQUMsUUFBUSxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO0lBQ2pDLENBQUM7SUFFRDs7Ozs7K0JBSzJCOzs7Ozs7OztJQUVwQixXQUFJOzs7Ozs7O0lBQVgsVUFBWSxLQUF1QixFQUFFLFFBQWlCLEVBQUUsSUFBYzs7WUFDOUQsU0FBUyxHQUFHLElBQUksQ0FBQyxZQUFZLENBQUMsS0FBSyxFQUFFLFFBQVEsQ0FBQztRQUNwRCxJQUFJLENBQUMsU0FBUyxFQUFFO1lBQ2QsT0FBTztTQUNSO1FBQ0QsS0FBSyxDQUFDLElBQUksQ0FBQyxVQUFDLENBQUMsRUFBRSxDQUFDO1lBQ2QsSUFBSSxDQUFDLFFBQVEsRUFBRTtnQkFDYixPQUFPLFNBQVMsQ0FBQyxDQUFDLENBQUMsT0FBTyxFQUFFLEVBQUUsQ0FBQyxDQUFDLE9BQU8sRUFBRSxDQUFDLENBQUM7YUFDNUM7WUFDRCxPQUFPLFNBQVMsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLFFBQVEsQ0FBQyxFQUFFLENBQUMsQ0FBQyxJQUFJLENBQUMsUUFBUSxDQUFDLENBQUMsQ0FBQztRQUN2RCxDQUFDLENBQUMsQ0FBQztRQUNILElBQUksSUFBSSxFQUFFO1lBQ1IsS0FBSyxDQUFDLE9BQU8sRUFBRSxDQUFDO1NBQ2pCO0lBQ0gsQ0FBQzs7OztJQW5ETSxlQUFRLEdBQUc7UUFDaEIsUUFBUSxFQUFFLFVBQVU7UUFDcEIsUUFBUSxFQUFFLFVBQVU7UUFDcEIsU0FBUyxFQUFFLFdBQVc7S0FDdkIsQ0FBQztJQWdESixhQUFDO0NBQUEsQUF2REQsSUF1REM7U0F2RHFCLE1BQU07Ozs7OztJQUcxQixnQkFJRSIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IEl0ZW0gfSBmcm9tICcuLi9pdGVtL2l0ZW0nO1xuXG4vKiogVXNlZCBmb3IgbmF0dXJhbCBzb3J0aW5nIG9mIHN0cmluZ3MgKi9cbmNvbnN0IGNvbGxhdG9yID0gbmV3IEludGwuQ29sbGF0b3IodW5kZWZpbmVkLCB7IG51bWVyaWM6IHRydWUsIHNlbnNpdGl2aXR5OiAnYmFzZScgfSk7XG5cbi8qKiBTb3J0cyBzdHJpbmdzIChuYXR1cmFsbHkpICovXG5leHBvcnQgZnVuY3Rpb24gc29ydFN0cmluZyhhLCBiKSB7XG4gIHJldHVybiBjb2xsYXRvci5jb21wYXJlKGEsIGIpO1xufVxuXG4vKiogU29ydHMgbnVtYmVycyAqL1xuZXhwb3J0IGZ1bmN0aW9uIHNvcnROdW1iZXIoYSwgYikge1xuICByZXR1cm4gYSAtIGI7XG59XG5cbi8qKiBTb3J0cyBib29sZWFucyAqL1xuZXhwb3J0IGZ1bmN0aW9uIHNvcnRCb29sZWFuKGEsIGIpIHtcbiAgcmV0dXJuIGEgPyAtMSA6IDE7XG59XG5cbi8qKiBUaGUgU29ydGVyIGlzIGEgc2luZ2xldG9uIHRoYXQgaGFuZGxlcyBhbGwga2luZHMgb2Ygc29ydGluZyBvcGVyYXRpb25zLiAqL1xuZXhwb3J0IGFic3RyYWN0IGNsYXNzIFNvcnRlcjxUPiB7XG5cbiAgLyoqIENvbnRhaW5zIHNvcnRpbmcgbWV0aG9kcyBmb3IgZGlmZmVyZW50IHZhbHVlIHR5cGVzLiAqL1xuICBzdGF0aWMgc29ydFR5cGUgPSB7XG4gICAgJ3N0cmluZyc6IHNvcnRTdHJpbmcsXG4gICAgJ251bWJlcic6IHNvcnROdW1iZXIsXG4gICAgJ2Jvb2xlYW4nOiBzb3J0Qm9vbGVhblxuICB9O1xuXG4gIC8qKiBSZXR1cm5zIHRoZSBzb3J0aW5nIGFsZ29yaXRobSBmb3IgdGhlIGdpdmVuIGl0ZW0gYXJyYXkuICovXG4gIHByaXZhdGUgc3RhdGljIGdldEFsZ29yaXRobShpdGVtczogQXJyYXk8SXRlbTxhbnk+PiwgcHJvcGVydHk/OiBzdHJpbmcpOiAoYSwgYikgPT4gbnVtYmVyIHtcbiAgICBpZiAoIWl0ZW1zLmxlbmd0aCkge1xuICAgICAgcmV0dXJuO1xuICAgIH1cbiAgICBpZiAocHJvcGVydHkgJiYgIWl0ZW1zXG4gICAgICAucmVkdWNlKChoYXMsIGl0ZW0pID0+IGhhcyAmJiBpdGVtLnNvcnQocHJvcGVydHkpICE9PSB1bmRlZmluZWQsIHRydWUpKSB7XG4gICAgICBjb25zb2xlLndhcm4oJ2Nhbm5vdCBzb3J0IHByb3BlcnR5IFwiJyArIHByb3BlcnR5ICsgJ1wiIGJlY2F1c2Ugbm90IGFsbCBpdGVtcyBoYXZlIHRoYXQgcHJvcGVydHknLCBpdGVtcyk7XG4gICAgICByZXR1cm47XG4gICAgfVxuICAgIGNvbnN0IHR5cGVzID0gaXRlbXNcbiAgICAgIC5tYXAoaXRlbSA9PiB0eXBlb2YgaXRlbS5zb3J0KHByb3BlcnR5KSlcbiAgICAgIC5maWx0ZXIoKGl0ZW0sIGluZGV4LCBfaXRlbXMpID0+IF9pdGVtcy5pbmRleE9mKGl0ZW0pID09PSBpbmRleCk7XG4gICAgaWYgKHR5cGVzLmxlbmd0aCA+IDEpIHtcbiAgICAgIGNvbnNvbGUud2FybignY2Fubm90IHNvcnQgaXRlbXMgYmVjYXVzZSB0aGV5IGNvbnRhaW4gbXVsdGlwbGUgdHlwZXM6JywgdHlwZXMpO1xuICAgICAgcmV0dXJuO1xuICAgIH1cbiAgICBpZiAoIXRoaXMuc29ydFR5cGVbdHlwZXNbMF1dKSB7XG4gICAgICBjb25zb2xlLndhcm4oJ2Nhbm5vdCBzb3J0IGl0ZW1zIGJlY2F1c2Ugbm8gYWxnb3JpdGhtIHdhcyBmb3VuZCBmb3IgdHlwZScsIHR5cGVzWzBdKTtcbiAgICAgIHJldHVybjtcbiAgICB9XG4gICAgcmV0dXJuIHRoaXMuc29ydFR5cGVbdHlwZXNbMF1dO1xuICB9XG5cbiAgLyoqIFNvcnRzIGEgZ2l2ZW4gQXJyYXkgb2YgaXRlbXMgYWZ0ZXIgYSBnaXZlbiBwcm9wZXJ0eS5cbiAgICogQHBhcmFtIGl0ZW1zIEFycmF5IG9mIGFyYml0cmFyeSBjb250ZW50LlxuICAgKiBAcGFyYW0gcHJvcGVydHkgT3B0aW9uYWwgcHJvcGVydHkgdG8gc29ydCBhZnRlciAoRm9yIE9iamVjdHMpXG4gICAqIEBwYXJhbSBkZXNjIE9wdGlvbmFsIEZsYWcgdGhhdCB3aWxsIHJldmVyc2Ugc29ydCB0aGUgcmVzdWx0IChkZXNjZW5kaW5nKS5cbiAgICogQHBhcmFtIHJlc29sdmUgT3B0aW9uYWwgcmVzb2x2ZSBmdW5jdGlvbiB0byBleHBvc2UgcmVsZXZhbnQgdGhlIHBhcnQgb2Ygb2JqZWN0IHRoYXQgY29udGFpbnNcbiAgICogICB0aGUgZ2l2ZW4gcHJvcGVydHkuICovXG5cbiAgc3RhdGljIHNvcnQoaXRlbXM6IEFycmF5PEl0ZW08YW55Pj4sIHByb3BlcnR5Pzogc3RyaW5nLCBkZXNjPzogYm9vbGVhbik6IEFycmF5PGFueT4ge1xuICAgIGNvbnN0IGFsZ29yaXRobSA9IHRoaXMuZ2V0QWxnb3JpdGhtKGl0ZW1zLCBwcm9wZXJ0eSk7XG4gICAgaWYgKCFhbGdvcml0aG0pIHtcbiAgICAgIHJldHVybjtcbiAgICB9XG4gICAgaXRlbXMuc29ydCgoYSwgYikgPT4ge1xuICAgICAgaWYgKCFwcm9wZXJ0eSkge1xuICAgICAgICByZXR1cm4gYWxnb3JpdGhtKGEucmVzb2x2ZSgpLCBiLnJlc29sdmUoKSk7XG4gICAgICB9XG4gICAgICByZXR1cm4gYWxnb3JpdGhtKGEuc29ydChwcm9wZXJ0eSksIGIuc29ydChwcm9wZXJ0eSkpO1xuICAgIH0pO1xuICAgIGlmIChkZXNjKSB7XG4gICAgICBpdGVtcy5yZXZlcnNlKCk7XG4gICAgfVxuICB9XG59XG4iXX0=