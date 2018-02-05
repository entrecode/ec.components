import Resource from 'ec.sdk/lib/resources/Resource';
import { Form, FormConfig } from '@ec.components/core';
import { Item } from '@ec.components/core/src/item/item';
import Core from 'ec.sdk/lib/Core';

export class ResourceForm extends Form<Resource> {
    constructor(body: Resource, config?: FormConfig<Resource>, public api?: Core, public relation?: string) {
        super(body, config);
    }
    /** Saves the given value. Run serializers before assigning the new value. */
    save(value: Object): Promise<Item<Resource>> {

        if (this.config.onSave) {
            return Promise.resolve(this.config.onSave(this, value))
                // return Promise.resolve(this.config.onSave(this, this.serialize(value)))
                .then((_value: Resource) => {
                    this.body = _value;
                    return this;
                });
        }
        const body = this.getBody(); // Resource
        /* form.deleteImmutableProperties(body); */
        // TODO: find out why it does not work when using helper properties (like thumb in asset form)
        /* this.serialize(value); */
        if (body && 'save' in body) {
            Object.assign(body, value);
            return body.save().then(() => this);
        } else {
            if (!this.api || !this.relation) {
                return Promise.reject('Cannot create resource: api or relation are unknown');
            }
            return this.api.create(this.relation, value).then((resource) => {
                this.body = resource;
                return this;
            })
        }
    }
}
