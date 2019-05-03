import { Notification } from './notification';

/** This interface can be used on a component that uses notifications. */
export interface WithNotifications {
  /** Stores notification history for later access. E.g. stores errors that should be hidden later. */
  notifications?: Notification[];
  /** If true, no notifications will be emitted */
  silent?: boolean;
}
