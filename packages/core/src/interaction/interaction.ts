import { Item } from '../item/item';

export interface SourceConfig<T> {
    resolve: Promise<Item<T>>;
    lazy: boolean;
}

export class Source<T> {
    cache: Item<T>;
    constructor(public config: SourceConfig<T>) {
    }

    resolve(options) {
        if (this.config.lazy && this.cache) {
            return Promise.resolve(this.cache);
        }
    }
}

export interface InteractionConfig<T> {
    key: string;
    label?: string;
    activate?: (interaction: Interaction<T>) => any;
    children?: Array<Interaction<any>>;
    data?: any;
    require?: Interaction<any>[]; // which interactions need to be fulfilled in the forefront
}

export class Interaction<T> {
    public ready: Promise<any>;
    public children: Interaction<any>[];
    public parent: Interaction<any>;
    public root: Interaction<any>;
    public path: Array<Interaction<any>>;
    public label: string;
    public state: Interaction<any>;
    public query: string; // todo relpace with form
    public data: any;

    constructor(public config: InteractionConfig<T>) {
        this.children = config.children || [];
        this.path = [];
        this.label = config.label || config.key;
        this.state = this;
        this.data = config.data || {};
    }

    resolveRequire() {
        if (!this.config.require) {
            return Promise.resolve();
        }
        return Promise.all(this.config.require.map(required => required.activate()))
    }

    activate(): Promise<any> {
        this.ready = this.resolveRequire();
        return this.ready;
    }

    addChild(interaction: Interaction<any>) {
        this.children.push(interaction);
    }

    addChildren(interactions: Interaction<any>[]) {
        interactions.forEach(interaction => this.addChild(interaction));
    }

    go(child: Interaction<any>) {
        this.path.push(child);
        child.root = this.root || this;
        child.parent = this;
        this.state = child;
        return child.activate();
    }

    undo() {
        console.log('undo');
    }

}

