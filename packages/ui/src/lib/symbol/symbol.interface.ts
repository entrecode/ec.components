/** A Symbol is specified with a unique name and an optional string content.  */
export interface Symbol {
  /** The name under which the symbol is accessible. */
  name: string;
  /** Text content. If nothing is set, the symbol is expected to have e.g. valid font glyph name. */
  content?: string;
}
