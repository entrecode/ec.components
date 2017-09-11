"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/** A Notification is used inside NotificationService and NotificationComponent to display any information to the user.*/
class Notification {
    /** The constructor just looks if an error is set, and if yes, sets the type to error. */
    constructor(notification) {
        if (notification.error) {
            this.type = 'error';
        }
        Object.assign(this, notification);
    }
}
exports.Notification = Notification;
//# sourceMappingURL=notification.js.map