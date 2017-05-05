/** An Environment holds all information that is consumed by the datamanager.
 * Environments can be used to easily switch between different systems.
 * At build time a flag (e.g. -prod) decides which environment will be used. */
export interface Environment {
  /** Datamanager clientID. Needed for login, signup and token handling. */
  clientID?: string,
  /** URL of account server API.*/
  apiUrlAccounts?: string,
  /** URL of datamanager API */
  apiRoot?: string,
  // apiUrlDatamanager?: string,
  /** ID of datamanager. Is expected to run live. It is recommended to always use apiRoot instead.*/
  datamanagerID?: string
}