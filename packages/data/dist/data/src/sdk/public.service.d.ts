import { SdkService } from './sdk.service';
import AccountResource from 'ec.sdk/src/resources/accounts/AccountResource';
/** This service handles the auth flow for public user accounts. */
export declare class PublicService {
    private sdk;
    /** Injects the sdk  */
    constructor(sdk: SdkService);
    /** Logs in with the given credentials */
    login(credentials: {
        email: string;
        password: string;
    }): Promise<AccountResource>;
    /** Logs out the current user */
    logout(): Promise<AccountResource>;
    /** Registers a new user with an optional invite code */
    signup(credentials: {
        email: string;
        password: string;
        invite: string;
    }): Promise<AccountResource>;
}
