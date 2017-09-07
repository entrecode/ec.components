import { Notification } from './notification';
import { Observable } from 'rxjs';
/** This service is the main interaction layer for the developer to show notifications.
 * You can use desktop notifications by default by providing:
 * ```json
 {
   provide: "useDesktopNotifications",
   useValue: true
 }```
 * in your module's providers.
 *
 * */
export declare class NotificationsService {
    private useDesktopNotifications;
    /** The emitter subject to fire notifications. */
    private emitter;
    /** Observable that is nexted when a new notification comes in. */
    emitter$: Observable<Notification>;
    /** The default view time for a notification. */
    defaultTime: number;
    /** The constructors injects the useDesktopNotifications flag from the module.
     * If true, all notifications will be shown as desktop notifications instead. */
    constructor(useDesktopNotifications: any);
    /** Emits a notification to all ec-notification components. If host is set, it is only pushed to the specified host.*/
    emit(notification: Notification, desktop?: boolean): void;
    /** Asks for permission to show desktop notifications, if not already granted. */
    getPermission(): Promise<void>;
    /** Emits a desktop notification after asking for permission (if not already granted). */
    desktopNotification(notification: Notification): void;
}
