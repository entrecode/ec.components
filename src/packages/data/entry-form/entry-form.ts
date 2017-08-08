import { EntryListConfig } from '..';
import { Form } from '../../core/form/form';

/**
 * Extension of List for Datamanager Entries.
 */
export class EntryForm<Entry> extends Form<Entry> {
  private model: string;

  /** The constructor will init the Form and generate the field config from the model schema */
  constructor(model: string, body, config: EntryListConfig = {}) {
    super(body, config);
    this.model = model;
  }
}
