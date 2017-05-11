import { Pagination } from '..';
describe('Pagination', () => {
  beforeEach(() => {
    /*TestBed.configureTestingModule({
     providers: [Sorter]
     });*/
  });

  it('should construct with default values', () => {
    const pagination = new Pagination();
    expect(pagination['config'].page).toBe(1);
    expect(pagination['config'].size).toBe(25);
  });

  it('should accept custom values', () => {
    const pagination = new Pagination({ size: 10, page: 2 });
    expect(pagination['config'].page).toBe(2);
    expect(pagination['config'].size).toBe(10);
  });

  it('should support select and change$', () => {
    let loaded = false;
    const pagination = new Pagination({});
    pagination.change$.subscribe(() => {
      loaded = true;
    });
    pagination.setTotal(50);
    pagination.select(2);
    pagination.select(2);
    expect(loaded).toBe(true);
    expect(pagination.getPage()).toBe(2);
  });

  it('should support next/prev + isActive', () => {
    const pagination = new Pagination({});
    expect(() => {
      pagination.last();
    }).toThrow();
    expect(pagination.isLast()).toBe(true);
    pagination.setTotal(75);
    expect([1, 2, 3].map(p => pagination.isActive(p))).toEqual([true, false, false]);
    pagination.next();
    expect([1, 2, 3].map(p => pagination.isActive(p))).toEqual([false, true, false]);
    pagination.next();
    expect([1, 2, 3].map(p => pagination.isActive(p))).toEqual([false, false, true]);
    pagination.next(); // one step too far
    expect([1, 2, 3].map(p => pagination.isActive(p))).toEqual([false, false, true]);
    pagination.prev();
    expect([1, 2, 3].map(p => pagination.isActive(p))).toEqual([false, true, false]);
    pagination.prev();
    expect([1, 2, 3].map(p => pagination.isActive(p))).toEqual([true, false, false]);
    pagination.prev(); // one step too far
    expect([1, 2, 3].map(p => pagination.isActive(p))).toEqual([true, false, false]);
  });

  it('should support first/last isFirst/isLast', () => {
    const pagination = new Pagination({});
    pagination.setTotal(75);
    pagination.last();
    expect(pagination.isFirst()).toBe(false);
    expect(pagination.isLast()).toBe(true);
    pagination.first();
    expect(pagination.isFirst()).toBe(true);
    expect(pagination.isLast()).toBe(false);
  });

  it('should support dynamic item counts', () => {
    const pagination = new Pagination({});
    pagination.setTotal(50);
    pagination.next();
    expect(pagination.getPages()).toBe(2);
    expect(pagination.isLast()).toBe(true);
    expect(pagination.isFirst()).toBe(false);
    pagination.setTotal(25);
    expect(pagination.isFirst()).toBe(true);
    expect(pagination.isLast()).toBe(true);
    expect(pagination.getPages()).toBe(1);
    pagination.setTotal(75);
    expect(pagination.getPages()).toBe(3);
    expect(pagination.isLast()).toBe(false);

  });
});
