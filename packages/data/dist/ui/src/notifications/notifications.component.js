"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * Created by felix on 26.05.17.
 */
const core_1 = require("@angular/core");
const collection_1 = require("@ec.components/core/src/collection/collection");
const notifications_service_1 = require("./notifications.service");
/** Displays any kind of Notification inside the DOM. It listens on the notificationService.$emitter for notifications. */
class NotificationsComponent {
    /** Listens on the NotificationService and shows each notification that has this component set as host, or none at all. */
    constructor(notificationService) {
        this.notificationService = notificationService;
        /** The current stack of notifications that are visible. */
        this.notifications = new collection_1.Collection([]);
        this.time = this.time || this.notificationService.defaultTime;
        this.notificationService.emitter$.subscribe((notification) => {
            if (!notification.host || notification.host === this) {
                this.notifications.add(notification);
                setTimeout(() => this.notifications.remove(notification), notification.time || this.time);
            }
        });
    }
}
NotificationsComponent.decorators = [
    { type: core_1.Component, args: [{
                selector: 'ec-notifications',
                templateUrl: './notifications.component.html',
                styleUrls: ['./notifications.component.scss']
            },] },
];
/** @nocollapse */
NotificationsComponent.ctorParameters = () => [
    { type: notifications_service_1.NotificationsService, },
];
NotificationsComponent.propDecorators = {
    'time': [{ type: core_1.Input },],
};
exports.NotificationsComponent = NotificationsComponent;
//# sourceMappingURL=notifications.component.js.map