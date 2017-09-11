/**
 * Created by felix on 26.05.17.
 */
import { EventEmitter } from '@angular/core';
/** A Pop is an area of content whose visibility can be toggled.
 * It can be used e.g as popup, modal or dropdown.*/
export declare class PopComponent {
    /** If true, .ec-pop is part of the DOM (*ngIf) + .active is set on .ec-pop-container.  */
    active: boolean;
    /** If true, .visible is set on .ec-pop-container.  */
    visible: boolean;
    /** Emits the value of visible on change. */
    _toggle: EventEmitter<boolean>;
    /** The amount of time between setting active and visible. Defaults to 0. */
    delay: number;
    /** Shows if not visible, hides if visible. */
    toggle(visible?: boolean, emit?: boolean): void;
    /** Shows the pop. First sets active and after the delay it sets visible. */
    show(): void;
    /** Hides the pop. First removes visible and after the delay it removes active. */
    hide(): void;
}
