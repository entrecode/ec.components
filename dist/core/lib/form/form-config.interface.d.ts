import { ItemConfig } from '../item/item-config.interface';
/** FormConfig is an extension of ItemConfig. */
export interface FormConfig<T> extends ItemConfig<T> {
    /** If true, no submit button will be rendered. */
    hideSubmitButton?: boolean;
    /** The label of the submit button */
    submitButtonLabel?: string;
}
