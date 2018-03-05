import { LoaderComponent } from './loader.component';
/** This interface can be used on a component that uses a loader. */
export interface WithLoader {
  /** The loader that is contacted on any kind of loading operation. */
  loader: LoaderComponent
}
