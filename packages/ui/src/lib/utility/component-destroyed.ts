import { Subject } from 'rxjs';

export function componentDestroyed(component: any) {
  const destroyed: Subject<void> = new Subject<void>();
  const originalDestroy = component.ngOnDestroy;
  component.ngOnDestroy = () => {
    if (originalDestroy) {
      originalDestroy();
    }
    destroyed.next();
    destroyed.unsubscribe();
  };
  return destroyed;
}
