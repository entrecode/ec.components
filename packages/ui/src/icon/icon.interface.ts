/** An Icon is specified with a unique name and an optional string content.  */
export interface Icon {
    /** The name under which the icon is accessible through ec-icon. */
    name: string
    /** Text content. If nothing is set, the icon is expected to have a valid font glyph name. */
    content?: string
};
