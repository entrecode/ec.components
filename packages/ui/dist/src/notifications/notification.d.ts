import { NotificationsComponent } from './notifications.component';
/** A Notification is used inside NotificationService and NotificationComponent to display any information to the user.*/
export declare class Notification {
    /** The title is the headline of a notification and the only value that is required. */
    title: string;
    /** The message is shown below the title and is meant for further description. */
    message?: string;
    /** The host the is NotificationsComponent that should display the notification. */
    host?: NotificationsComponent;
    /** The amount of ms it should be visible */
    time?: number;
    /** Determines the looks. Currently info, error and success are defined. */
    type?: string;
    /** If an error is given, the type will automatically be set to error. The error will be displayed inside the notification via ec-error.*/
    error?: any;
    /** The constructor just looks if an error is set, and if yes, sets the type to error. */
    constructor(notification: Notification);
}
