import { ResourceList } from './resource-list';
import { SdkService } from '../sdk/sdk.service';
/* import { environment } from '../../../../demo/environments/environment.test'; */


describe('ResourceList', () => {

    /* it('should construct', () => {
        const sdk = new SdkService(environment);
        const list = new ResourceList({});
        expect(list).toBeDefined();
        // TODO test with new relation + api properties
    });

    it('should support filter options', () => {
        const sdk = new SdkService(environment);
        const list = new ResourceList({});
        const o = list['getFilterOptions']({ size: 10, page: 1, filter: { name: 'Pandora' }, sortBy: 'name' });
        const options = {
            name: { search: 'Pandora' },
            size: 10,
            sort: ['name']
        };
        expect(o.sort).toEqual(['name']);
        expect(o.size).toEqual(10);
        expect(o.name).toEqual({ search: 'Pandora' });
        list.toggleSort('name');
        expect(list.config.sortBy).toBe('name');
        expect(list.config.desc).toBe(false);
        list.toggleSort('name');
        expect(list.config.desc).toBe(true);
        list.config.filter = list.filterProperty('name', 'Pandora'); // add filter
        expect(list.config.filter['name']).toBe('Pandora');
        list.config.filter = list.filterProperty('name', ''); // remove filter
        expect(list.config.filter['name']).toBeUndefined();
        list.config.filter = list.filterProperty('name', ''); // remove filter again
    }); */
});
