import { Notification } from "./notification";
import { Collection } from '@ec.components/core/src/collection/collection';
import { NotificationsService } from './notifications.service';
/** Displays any kind of Notification inside the DOM. It listens on the notificationService.$emitter for notifications. */
export declare class NotificationsComponent {
    private notificationService;
    /** The current stack of notifications that are visible. */
    notifications: Collection<Notification>;
    /** The default time for a notification to be visible. Will be ignored if the notification itself has a time set. */
    time: number;
    /** Listens on the NotificationService and shows each notification that has this component set as host, or none at all. */
    constructor(notificationService: NotificationsService);
}
