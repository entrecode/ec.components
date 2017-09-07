import { LoaderComponent } from './loader.component';
/** The loader service registers promises */
export declare class LoaderService {
    /** The global loader that should be used if not loader is passed to wait. */
    loader: LoaderComponent;
    /** Sets a global loader that can be triggered without having the reference. */
    use(loader: LoaderComponent): void;
    /** Tells the given loader to wait for the given promise. If no loader is given, the global loader is used (if set)*/
    wait(promise: Promise<any>, loader?: LoaderComponent): Promise<any>;
}
