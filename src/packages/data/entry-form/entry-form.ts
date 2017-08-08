import { Item } from '../../core';
import { EntryListConfig, ModelConfig } from '..';
import { Form } from '../../core/form/form';

/**
 * Extension of List for Datamanager Entries.
 */
export class EntryForm<Entry> extends Form<Entry> {
  private model: string;

  /** The constructor will init the Form and generate the field config from the model schema */
  constructor(model: string, body, config: EntryListConfig = {}, private modelConfig: ModelConfig) {
    super(body, Object.assign({
      identifier: '_id',
      resolve: (entry => entry.value || {}),
      fields: config ? config.fields : null,
      onSave: (item: Item<Entry>) => {
        console.log('save?', item);
        const entry = item.getBody();
        if (!entry || !entry['save']) {
          console.log('no body.. TODO: create entry', entry);
          return;
        }
        //TODO save!
        // Datamanager.save(entry);
      }
    }, config));
    this.model = model;
    if (this.config.fields) {
      // this.load();
      return;
    }
    this.modelConfig.generateFieldConfig(this.model).then((fieldConfig) => {
      Object.assign(this.config, { fields: fieldConfig });
      // this.load();
    });
  }

}
