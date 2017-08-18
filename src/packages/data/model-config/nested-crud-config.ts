//this config is used for all entry-select cruds
//it did not work to inject the modelConfigService into a dynamic component
//TODO find better way to import nestedConfig through ModelConfigService
import { CrudConfig } from '../crud/crud-config.interface';

export const nestedCrudConfig: CrudConfig = {
  size: 10,
  // methods: ['read'],
  popClass: 'sidebar-right'
};
