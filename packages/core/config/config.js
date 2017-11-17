"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/** The Root class for all Configurations. */
var Config = /** @class */ (function () {
    function Config() {
        // TODO use Map !!!! (like simi did in EventEmitter.ts)
        /** The config object. */
        this.config = {};
    }
    /** This method is a getter and setter for configurations. The key stands for the config (e.g. model).
     * The property is a sub property if the config (e.g. fields => model.fields).
     * If no config is given, the method just returns the configuration for the given property.
     * If a config is given, the property config is merged via Object.assign. */
    Config.prototype.configure = function (key, property, config) {
        if (!this.config[key]) {
            this.config[key] = {};
        }
        if (!config) {
            return this.config[key][property];
        }
        if (!this.config[key][property]) {
            this.config[key][property] = {};
        }
        Object.assign(this.config[key][property], config);
        return this;
    };
    return Config;
}());
exports.Config = Config;
