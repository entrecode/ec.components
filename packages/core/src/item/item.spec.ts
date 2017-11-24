import { Item } from './item';

describe('Item', () => {

  it('should construct an item and support resolve', () => {
    const body = { id: 'a' };
    const i = new Item(body);
    expect(i['body']).toBe(body);
    expect(i.getBody()).toBe(body);
    expect(i.resolve()).toBe(body);
    expect(i.resolve('id')).toBe('a');
    i.clear();
    expect(i.getBody()).toBeUndefined();
  });

  it('resolve', () => {
    const item = new Item(undefined);
    expect(item.resolve()).toBeUndefined();
  })

  it('should support getProperties', () => {
    const body = { id: 'a' };
    const i = new Item(body);
    const j = new Item('x');
    expect(i.getProperties()).toEqual(Object.keys(i['body']));
    expect(() => {
      j.id()
    }).toThrow();
  });
  it('should support transforms', () => {
    const i = new Item({ id: 'a' });
    expect(i['transform']('xyz', 'id')).toBe('a');
    const j = new Item({ id: 'b' }, {
      fields: {
        id: {
          display: (v) => {
            return v + '!!';
          }
        }
      }
    });
    expect(j.display('id')).toBe('b!!');
  });

  it('should resolve before other transformations', () => {
    const config = {
      fields: {
        name: {
          resolve: (v) => {
            return 'Name:' + v.name
          },
          display: (v) => v + '!',
          group: (v) => v.length,
          validate: (v) => v.indexOf('a') === -1 ? 'Kein a enthalten!' : null,
          sort: (v) => v.length
        }
      }
    };
    const persons = [
      new Item({ name: 'Max' }, config),
      new Item({ name: 'Tobi' }, config),
      new Item({ name: 'Mareike' }, config),
    ];

    expect(persons[0].resolve('name')).toBe('Name:Max');
  });

  it('should support onSave', () => {
    const config = { onSave: (item, body) => body + 1 };
    const n = new Item(1, config);
    expect(n.getConfig()).toBe(config);
    return n.save().then(() => {
      return expect(n.resolve()).toBe(2);
    });
  });

  it('display', () => {
    const item = new Item(6);
    expect(item.display()).toBe(6);
  })

  it('pickWriteOnly', () => {
    const item = new Item({ name: 'Tobsen', age: 10 }, { fields: { name: {}, age: { readOnly: true } } });
    const writeOnly = item.pickWriteOnly();
    expect(writeOnly.name).toBe('Tobsen');
    expect(writeOnly.age).toBeUndefined();
  });
});
