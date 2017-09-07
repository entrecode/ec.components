import { Collection } from '@ec.components/core/src/collection/collection';
import { TabComponent } from '../tab/tab.component';
/** The TabsComponent holds serveral instances of TabComponent. */
export declare class TabsComponent {
    tabs: Collection<TabComponent>;
    /** You can set the initially selected tab by passing a TabComponent in (e.g. via #variable) */
    selected: TabComponent;
    /** The constructor inits the collection of tabs */
    constructor();
    /** This method adds a new tab to the tabs collection and auto selects if it is the first. */
    add(tab: TabComponent): void;
}
