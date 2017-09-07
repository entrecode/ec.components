import DataManager from 'ec.sdk/src/DataManager';
import Accounts from 'ec.sdk/src/Accounts';
import PublicAPI from 'ec.sdk/src/PublicAPI';
import Session from 'ec.sdk/src/Session';
import AccountResource from 'ec.sdk/src/resources/accounts/AccountResource';
/** The SdkService exposes all instances of the ec.sdk APIs.
 * To be able to use it, you have to provide an environment like this in your module's providers:
 *
 *```json
 {
   provide: "environment",
   useValue: {
     datamanagerID: "83cc6374",
     environment: "stage",
     clientID: "rest"
   }
 }```
 * The environment is optional, defaulting to live. See
 * https://entrecode.github.io/ec.sdk/#environment for more info. The clientID is only optional if
 * you do not plan to use authentication. See https://entrecode.github.io/ec.sdk/#environment =>
 * setClientID.
 */
export declare class SdkService {
    private environment;
    /** Current Session instance */
    session: Session;
    /** Current Accounts instance */
    accounts: Accounts;
    /** Current Public API instance */
    api: PublicAPI;
    /** Current DataManager instance */
    datamanager: DataManager;
    /** Current User */
    user: AccountResource;
    /** Pending schema requests */
    private schemaRequests;
    /** Promise that should be used before using any auth related stuff:
     *
     * ```ts
     * this.sdk.ready.then(account => {});
     * ```
     * */
    ready: Promise<AccountResource>;
    /** Calls init and sets ready to true when finished. */
    constructor(environment: any);
    /** Creates all the API instances and determines the current user. */
    init(environment?: any): Promise<AccountResource>;
    getSchema(model: any): any;
    /** Generic login that works with both public and admin API. */
    login(credentials: {
        email: string;
        password: string;
        invite: string;
    }): Promise<AccountResource>;
    /** Generic logout that works with both public and admin API. */
    logout(): Promise<AccountResource>;
    /** Returns the current account. Returns ec user or public user if any found. */
    getAccount(): Promise<AccountResource>;
    noDatamanagerID(): string;
    noClientID(): string;
}
