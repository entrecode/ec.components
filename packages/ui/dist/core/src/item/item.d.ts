import { ItemConfig } from './item-config.interface';
/** An Item basically wraps an Object and provides a config with metadata and helper methods to access the object. */
export declare class Item<T> {
    /** The value body of the item. This can be either a primitive value or an Object. */
    body: T;
    /** The config of the item. */
    protected config: ItemConfig<T>;
    /** Each item is constructed with its body and an optional config. */
    constructor(body: T, config?: ItemConfig<T>);
    /** Generates a config from the body by setting view to the properties type. */
    private generateConfig();
    /** Returns the item's body */
    getBody(): T;
    /** Returns true if the body is defined and not null*/
    hasBody(): boolean;
    /** deletes the item body */
    clear(): void;
    /** Assigns the given config to the existing via Object.assign */
    useConfig(config: ItemConfig<T>): void;
    /** Returns the item's config */
    getConfig(): ItemConfig<T>;
    /** Returns an Array of properties possessed by the body. */
    getProperties(): Array<string>;
    /** Returns the value of the the Item's identifier property. */
    id(): any;
    /** Returns either the whole body (if no property is given) or the value of the given property.
     * This method will traverse the body via the config.resolve function (if given). */
    resolve(property?: string): any;
    /** The main method for transformation functions like resolve, display and group.
     * If you dont set the third parameter, the current item value will be used.
     * The third parameter can be used to transform a value that is not yet possesed (e.g. to
     * serialize) */
    private transform(action, property, value?);
    /** Returns the output of the config.group transformation function with the given property value.
     * If no group function is set, it will just return the property value.*/
    group(property: string): any;
    /** Returns the output of the config.display transformation function with the given property value.
     * If no display function is set, it will just return the property value.*/
    display(property?: string): any;
    /** Transforms the given field's value for sorting */
    sort(property: string): any;
    /** Returns value with all readOnly properties removed */
    pickWriteOnly(value: any): any;
    /** Transforms the given field's value for serialization when saving. */
    serialize(value: any, put?: boolean): any;
    /** Saves the given value. Run serializers before assigning the new value. */
    save(value?: T): Promise<Item<T>>;
}
