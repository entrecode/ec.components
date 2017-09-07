"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = require("@angular/core");
const notification_1 = require("./notification");
const rxjs_1 = require("rxjs");
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
class NotificationsService {
    /** The constructors injects the useDesktopNotifications flag from the module.
     * If true, all notifications will be shown as desktop notifications instead. */
    constructor(useDesktopNotifications) {
        this.useDesktopNotifications = useDesktopNotifications;
        /** The emitter subject to fire notifications. */
        this.emitter = new rxjs_1.Subject();
        /** Observable that is nexted when a new notification comes in. */
        this.emitter$ = this.emitter.asObservable();
        /** The default view time for a notification. */
        this.defaultTime = 5000;
    }
    /** Emits a notification to all ec-notification components. If host is set, it is only pushed to the specified host.*/
    emit(notification, desktop) {
        if (desktop || this.useDesktopNotifications) {
            this.desktopNotification(new notification_1.Notification(notification));
        }
        else {
            this.emitter.next(new notification_1.Notification(notification));
        }
    }
    /** Asks for permission to show desktop notifications, if not already granted. */
    getPermission() {
        if (window.Notification.permission === 'granted') {
            return Promise.resolve();
        }
        return window.Notification.requestPermission().then((permission) => {
            // If the user accepts, let's create a notification
            if (permission !== 'granted') {
                return Promise.reject('Desktop Notification Permission Denied!');
            }
        });
    }
    /** Emits a desktop notification after asking for permission (if not already granted). */
    desktopNotification(notification) {
        if (!('Notification' in window)) {
            console.warn('This browser does not support desktop notification');
        }
        this.getPermission().then(() => {
            const message = new window.Notification(notification.title, { body: notification.message });
            setTimeout(() => message.close(), notification.time || this.defaultTime);
        });
    }
}
NotificationsService.decorators = [
    { type: core_1.Injectable },
];
/** @nocollapse */
NotificationsService.ctorParameters = () => [
    { type: undefined, decorators: [{ type: core_1.Inject, args: ['useDesktopNotifications',] },] },
];
exports.NotificationsService = NotificationsService;
//# sourceMappingURL=notifications.service.js.map