/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
/**
 * The Root class for all Configurations.
 * @abstract
 */
var /**
 * The Root class for all Configurations.
 * @abstract
 */
Config = /** @class */ (function () {
    function Config() {
        // TODO use Map !!!! (like simi did in EventEmitter.ts)
        /**
         * The config object.
         */
        this.config = {};
    }
    /** This method is a getter and setter for configurations. The key stands for the config (e.g. model).
     * The property is a sub property if the config (e.g. fields => model.fields).
     * If no config is given, the method just returns the configuration for the given property.
     * If a config is given, the property config is merged via Object.assign. */
    /**
     * This method is a getter and setter for configurations. The key stands for the config (e.g. model).
     * The property is a sub property if the config (e.g. fields => model.fields).
     * If no config is given, the method just returns the configuration for the given property.
     * If a config is given, the property config is merged via Object.assign.
     * @param {?} key
     * @param {?} property
     * @param {?=} config
     * @return {?}
     */
    Config.prototype.configure = /**
     * This method is a getter and setter for configurations. The key stands for the config (e.g. model).
     * The property is a sub property if the config (e.g. fields => model.fields).
     * If no config is given, the method just returns the configuration for the given property.
     * If a config is given, the property config is merged via Object.assign.
     * @param {?} key
     * @param {?} property
     * @param {?=} config
     * @return {?}
     */
    function (key, property, config) {
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
/**
 * The Root class for all Configurations.
 * @abstract
 */
export { Config };
if (false) {
    /**
     * The config object.
     * @type {?}
     * @private
     */
    Config.prototype.config;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY29uZmlnLmpzIiwic291cmNlUm9vdCI6Im5nOi8vQGVjLmNvbXBvbmVudHMvY29yZS8iLCJzb3VyY2VzIjpbImxpYi9jb25maWcvY29uZmlnLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7O0FBQ0E7Ozs7O0lBQUE7Ozs7O1FBR1UsV0FBTSxHQUVWLEVBQUUsQ0FBQztJQW1CVCxDQUFDO0lBakJDOzs7Z0ZBRzRFOzs7Ozs7Ozs7OztJQUNyRSwwQkFBUzs7Ozs7Ozs7OztJQUFoQixVQUFrQixHQUFXLEVBQUUsUUFBZ0IsRUFBRSxNQUFlO1FBQzlELElBQUksQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDLEdBQUcsQ0FBQyxFQUFFO1lBQ3JCLElBQUksQ0FBQyxNQUFNLENBQUMsR0FBRyxDQUFDLEdBQUcsRUFBRSxDQUFDO1NBQ3ZCO1FBQ0QsSUFBSSxDQUFDLE1BQU0sRUFBRTtZQUNYLE9BQU8sSUFBSSxDQUFDLE1BQU0sQ0FBQyxHQUFHLENBQUMsQ0FBQyxRQUFRLENBQUMsQ0FBQztTQUNuQztRQUNELElBQUksQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDLEdBQUcsQ0FBQyxDQUFDLFFBQVEsQ0FBQyxFQUFFO1lBQy9CLElBQUksQ0FBQyxNQUFNLENBQUMsR0FBRyxDQUFDLENBQUMsUUFBUSxDQUFDLEdBQUcsRUFBRSxDQUFDO1NBQ2pDO1FBQ0QsTUFBTSxDQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDLEdBQUcsQ0FBQyxDQUFDLFFBQVEsQ0FBQyxFQUFFLE1BQU0sQ0FBQyxDQUFDO1FBQ2xELE9BQU8sSUFBSSxDQUFDO0lBQ2QsQ0FBQztJQUNILGFBQUM7QUFBRCxDQUFDLEFBeEJELElBd0JDOzs7Ozs7Ozs7Ozs7SUFyQkMsd0JBRU8iLCJzb3VyY2VzQ29udGVudCI6WyIvKiogVGhlIFJvb3QgY2xhc3MgZm9yIGFsbCBDb25maWd1cmF0aW9ucy4gKi9cbmV4cG9ydCBhYnN0cmFjdCBjbGFzcyBDb25maWcge1xuICAvLyBUT0RPIHVzZSBNYXAgISEhISAobGlrZSBzaW1pIGRpZCBpbiBFdmVudEVtaXR0ZXIudHMpXG4gIC8qKiBUaGUgY29uZmlnIG9iamVjdC4gKi9cbiAgcHJpdmF0ZSBjb25maWc6IHtcbiAgICBba2V5OiBzdHJpbmddOiBPYmplY3QsXG4gIH0gPSB7fTtcblxuICAvKiogVGhpcyBtZXRob2QgaXMgYSBnZXR0ZXIgYW5kIHNldHRlciBmb3IgY29uZmlndXJhdGlvbnMuIFRoZSBrZXkgc3RhbmRzIGZvciB0aGUgY29uZmlnIChlLmcuIG1vZGVsKS5cbiAgICogVGhlIHByb3BlcnR5IGlzIGEgc3ViIHByb3BlcnR5IGlmIHRoZSBjb25maWcgKGUuZy4gZmllbGRzID0+IG1vZGVsLmZpZWxkcykuXG4gICAqIElmIG5vIGNvbmZpZyBpcyBnaXZlbiwgdGhlIG1ldGhvZCBqdXN0IHJldHVybnMgdGhlIGNvbmZpZ3VyYXRpb24gZm9yIHRoZSBnaXZlbiBwcm9wZXJ0eS5cbiAgICogSWYgYSBjb25maWcgaXMgZ2l2ZW4sIHRoZSBwcm9wZXJ0eSBjb25maWcgaXMgbWVyZ2VkIHZpYSBPYmplY3QuYXNzaWduLiAqL1xuICBwdWJsaWMgY29uZmlndXJlPyhrZXk6IHN0cmluZywgcHJvcGVydHk6IHN0cmluZywgY29uZmlnPzogT2JqZWN0KSB7XG4gICAgaWYgKCF0aGlzLmNvbmZpZ1trZXldKSB7XG4gICAgICB0aGlzLmNvbmZpZ1trZXldID0ge307XG4gICAgfVxuICAgIGlmICghY29uZmlnKSB7XG4gICAgICByZXR1cm4gdGhpcy5jb25maWdba2V5XVtwcm9wZXJ0eV07XG4gICAgfVxuICAgIGlmICghdGhpcy5jb25maWdba2V5XVtwcm9wZXJ0eV0pIHtcbiAgICAgIHRoaXMuY29uZmlnW2tleV1bcHJvcGVydHldID0ge307XG4gICAgfVxuICAgIE9iamVjdC5hc3NpZ24odGhpcy5jb25maWdba2V5XVtwcm9wZXJ0eV0sIGNvbmZpZyk7XG4gICAgcmV0dXJuIHRoaXM7XG4gIH1cbn1cbiJdfQ==