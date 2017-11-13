import { Item } from './item';

describe('Item', () => {

  it('should construct an item and support resolve', () => {
    const body = { id: 'a' };
    const i = new Item(body);
    expect(i['body']).toBe(body);
    expect(i.resolve()).toBe(body);
    expect(i.resolve('id')).toBe('a');
  });

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
    const n = new Item(1, { onSave: (item, body) => body + 1 });
    return n.save().then(() => {
      return expect(n.resolve()).toBe(2);
    });
  })
});
