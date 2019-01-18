/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
/**
 * An ItemConfig describes an abstract entity with certain properties.
 * @record
 * @template T
 */
export function ItemConfig() { }
if (false) {
    /**
     * For primitive values only: the title for the item
     * @type {?|undefined}
     */
    ItemConfig.prototype.title;
    /**
     * The Property that is used to identify items from another (e.g. in a selection).
     * @type {?|undefined}
     */
    ItemConfig.prototype.identifier;
    /**
     * Pattern of the identifier field. Is used e.g. in the searchbar
     * @type {?|undefined}
     */
    ItemConfig.prototype.identifierPattern;
    /**
     * The Property that is used to display the item for humans
     * @type {?|undefined}
     */
    ItemConfig.prototype.label;
    /**
     * The Items field Config
     * @type {?|undefined}
     */
    ItemConfig.prototype.fields;
    /**
     * The type of the Item. It determines how it will be displayed in different contexts
     * @type {?|undefined}
     */
    ItemConfig.prototype.type;
    /**
     * Custom resolve path function. It can be used e.g. to access subbranches of an Object.
     * @type {?|undefined}
     */
    ItemConfig.prototype.resolve;
    /**
     * Contains the parent Instance which inhabits the item. This property is set programmatically and therefore meant to be readonly.
     * @type {?|undefined}
     */
    ItemConfig.prototype.parent;
    /**
     * Callback that is invoked when the item is saved
     * @type {?|undefined}
     */
    ItemConfig.prototype.onSave;
    /**
     * Callback that is invoked before the item is edited
     * @type {?|undefined}
     */
    ItemConfig.prototype.onEdit;
    /**
     * This method can be used to set custom classes based on item contents. Used e.g. in list-items for row class
     * @type {?|undefined}
     */
    ItemConfig.prototype.classes;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaXRlbS1jb25maWcuaW50ZXJmYWNlLmpzIiwic291cmNlUm9vdCI6Im5nOi8vQGVjLmNvbXBvbmVudHMvY29yZS8iLCJzb3VyY2VzIjpbImxpYi9pdGVtL2l0ZW0tY29uZmlnLmludGVyZmFjZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7QUFJQSxnQ0F1QkM7Ozs7OztJQXJCQywyQkFBZTs7Ozs7SUFFZixnQ0FBb0I7Ozs7O0lBRXBCLHVDQUEyQjs7Ozs7SUFFM0IsMkJBQWU7Ozs7O0lBRWYsNEJBQXFCOzs7OztJQUVyQiwwQkFBYzs7Ozs7SUFFZCw2QkFBMkI7Ozs7O0lBRTNCLDRCQUFhOzs7OztJQUViLDRCQUE0RDs7Ozs7SUFFNUQsNEJBQXVDOzs7OztJQUV2Qyw2QkFBcUMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBJdGVtIH0gZnJvbSAnLi9pdGVtJztcbmltcG9ydCB7IEZpZWxkQ29uZmlnIH0gZnJvbSAnLi4vY29uZmlnL2ZpZWxkLWNvbmZpZy5pbnRlcmZhY2UnO1xuXG4vKiogQW4gSXRlbUNvbmZpZyBkZXNjcmliZXMgYW4gYWJzdHJhY3QgZW50aXR5IHdpdGggY2VydGFpbiBwcm9wZXJ0aWVzLiovXG5leHBvcnQgaW50ZXJmYWNlIEl0ZW1Db25maWc8VD4ge1xuICAvKiogRm9yIHByaW1pdGl2ZSB2YWx1ZXMgb25seTogdGhlIHRpdGxlIGZvciB0aGUgaXRlbSAqL1xuICB0aXRsZT86IHN0cmluZztcbiAgLyoqIFRoZSBQcm9wZXJ0eSB0aGF0IGlzIHVzZWQgdG8gaWRlbnRpZnkgaXRlbXMgZnJvbSBhbm90aGVyIChlLmcuIGluIGEgc2VsZWN0aW9uKS4gKi9cbiAgaWRlbnRpZmllcj86IHN0cmluZztcbiAgLyoqIFBhdHRlcm4gb2YgdGhlIGlkZW50aWZpZXIgZmllbGQuIElzIHVzZWQgZS5nLiBpbiB0aGUgc2VhcmNoYmFyICovXG4gIGlkZW50aWZpZXJQYXR0ZXJuPzogUmVnRXhwO1xuICAvKiogVGhlIFByb3BlcnR5IHRoYXQgaXMgdXNlZCB0byBkaXNwbGF5IHRoZSBpdGVtIGZvciBodW1hbnMgKi9cbiAgbGFiZWw/OiBzdHJpbmc7XG4gIC8qKiBUaGUgSXRlbXMgZmllbGQgQ29uZmlnICovXG4gIGZpZWxkcz86IEZpZWxkQ29uZmlnO1xuICAvKiogVGhlIHR5cGUgb2YgdGhlIEl0ZW0uIEl0IGRldGVybWluZXMgaG93IGl0IHdpbGwgYmUgZGlzcGxheWVkIGluIGRpZmZlcmVudCBjb250ZXh0cyAqL1xuICB0eXBlPzogc3RyaW5nO1xuICAvKiogQ3VzdG9tIHJlc29sdmUgcGF0aCBmdW5jdGlvbi4gSXQgY2FuIGJlIHVzZWQgZS5nLiB0byBhY2Nlc3Mgc3ViYnJhbmNoZXMgb2YgYW4gT2JqZWN0LiAqL1xuICByZXNvbHZlPzogKGJvZHk6IFQpID0+IGFueTtcbiAgLyoqIENvbnRhaW5zIHRoZSBwYXJlbnQgSW5zdGFuY2Ugd2hpY2ggaW5oYWJpdHMgdGhlIGl0ZW0uIFRoaXMgcHJvcGVydHkgaXMgc2V0IHByb2dyYW1tYXRpY2FsbHkgYW5kIHRoZXJlZm9yZSBtZWFudCB0byBiZSByZWFkb25seS4qL1xuICBwYXJlbnQ/OiBhbnk7XG4gIC8qKiBDYWxsYmFjayB0aGF0IGlzIGludm9rZWQgd2hlbiB0aGUgaXRlbSBpcyBzYXZlZCAqL1xuICBvblNhdmU/OiAoaXRlbT86IEl0ZW08VD4sIHZhbHVlPzogT2JqZWN0KSA9PiBQcm9taXNlPFQ+IHwgVDsgLy8gVE9ETyByZW5hbWUgdG8gc2F2ZVxuICAvKiogQ2FsbGJhY2sgdGhhdCBpcyBpbnZva2VkIGJlZm9yZSB0aGUgaXRlbSBpcyBlZGl0ZWQgKi9cbiAgb25FZGl0PzogKHZhbHVlPzogVCkgPT4gUHJvbWlzZTxUPiB8IFQ7IC8vIFRPRE8gcmVuYW1lIHRvIHNhdmVcbiAgLyoqIFRoaXMgbWV0aG9kIGNhbiBiZSB1c2VkIHRvIHNldCBjdXN0b20gY2xhc3NlcyBiYXNlZCBvbiBpdGVtIGNvbnRlbnRzLiBVc2VkIGUuZy4gaW4gbGlzdC1pdGVtcyBmb3Igcm93IGNsYXNzICovXG4gIGNsYXNzZXM/OiAoaXRlbT86IEl0ZW08VD4pID0+IHN0cmluZztcbn1cbiJdfQ==