import Resource from 'ec.sdk/lib/resources/Resource';
import { Form, FormConfig } from '../../../core';
import { Item } from '../../../core/src/item/item';
import Core from 'ec.sdk/lib/Core';
import { ResourceService } from '../resource-config/resource.service';

/** Form for any kind of SDK Resource. */
export class ResourceForm extends Form<Resource> {
    /** Constructs the form. Can be given an api (Core) and a fitting relation name. */
    constructor(body: Resource, config: FormConfig<Resource> = {},
        public api: Core,
        public relation: string,
        public resourceService: ResourceService) {
        super(body, config);
    }
    /** Saves the given value. Run serializers before assigning the new value. */
    save(value: Object): Promise<Item<Resource>> {
        return this.resourceService.save(this, value, this.relation, this.api)
            .then(resource => new Item(resource, this.config));
    }
}
