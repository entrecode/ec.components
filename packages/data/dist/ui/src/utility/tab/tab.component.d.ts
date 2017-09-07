/** A Tab is meant to be placed inside TabsComponent */
export declare class TabComponent {
    /** The tab's label */
    label: string;
    /** If set to true, the tab will be selected at start. */
    selected: boolean;
    /** The constructor adds the tab itself to its TabsComponent parent. */
    /** Returns true if the tab is currently selected. */
    isSelected(): void;
}
