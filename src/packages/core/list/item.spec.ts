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
  })
});