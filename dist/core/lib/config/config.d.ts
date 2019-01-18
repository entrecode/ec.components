/** The Root class for all Configurations. */
export declare abstract class Config {
    /** The config object. */
    private config;
    /** This method is a getter and setter for configurations. The key stands for the config (e.g. model).
     * The property is a sub property if the config (e.g. fields => model.fields).
     * If no config is given, the method just returns the configuration for the given property.
     * If a config is given, the property config is merged via Object.assign. */
    configure?(key: string, property: string, config?: Object): any;
}
