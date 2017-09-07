//this config is used for all entry-select cruds
//it did not work to inject the modelConfigService into a dynamic component
//TODO find better way to import nestedConfig through ModelConfigService
import { CrudConfig } from '../crud/crud-config.interface';
import EntryResource from 'ec.sdk/src/resources/publicAPI/EntryResource';

export const nestedCrudConfig: CrudConfig<EntryResource> = {
  size: 10,
  // methods: ['read'],
  // popClass: 'sidebar-right'
};
