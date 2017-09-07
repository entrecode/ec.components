import { FieldConfigProperty } from '@ec.components/core/src/config/field-config-property.interface';
/** The TypeConfig holds each field type's specific behaviour in certain situations */
export declare class TypeConfigService {
    /** Defines the base configuration of each type.*/
    private types;
    /** Returns the base FieldConfig for the given type. */
    get(type: string): FieldConfigProperty;
    /** Assigns the given config to the type, e.g. to change the default template of a type. */
    set(type: string, config: FieldConfigProperty): void;
}
