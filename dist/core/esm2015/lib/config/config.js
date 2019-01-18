/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
/**
 * The Root class for all Configurations.
 * @abstract
 */
export class Config {
    constructor() {
        // TODO use Map !!!! (like simi did in EventEmitter.ts)
        /**
         * The config object.
         */
        this.config = {};
    }
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
    configure(key, property, config) {
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
    }
}
if (false) {
    /**
     * The config object.
     * @type {?}
     * @private
     */
    Config.prototype.config;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY29uZmlnLmpzIiwic291cmNlUm9vdCI6Im5nOi8vQGVjLmNvbXBvbmVudHMvY29yZS8iLCJzb3VyY2VzIjpbImxpYi9jb25maWcvY29uZmlnLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7O0FBQ0EsTUFBTSxPQUFnQixNQUFNO0lBQTVCOzs7OztRQUdVLFdBQU0sR0FFVixFQUFFLENBQUM7SUFtQlQsQ0FBQzs7Ozs7Ozs7Ozs7SUFiUSxTQUFTLENBQUUsR0FBVyxFQUFFLFFBQWdCLEVBQUUsTUFBZTtRQUM5RCxJQUFJLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxHQUFHLENBQUMsRUFBRTtZQUNyQixJQUFJLENBQUMsTUFBTSxDQUFDLEdBQUcsQ0FBQyxHQUFHLEVBQUUsQ0FBQztTQUN2QjtRQUNELElBQUksQ0FBQyxNQUFNLEVBQUU7WUFDWCxPQUFPLElBQUksQ0FBQyxNQUFNLENBQUMsR0FBRyxDQUFDLENBQUMsUUFBUSxDQUFDLENBQUM7U0FDbkM7UUFDRCxJQUFJLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxHQUFHLENBQUMsQ0FBQyxRQUFRLENBQUMsRUFBRTtZQUMvQixJQUFJLENBQUMsTUFBTSxDQUFDLEdBQUcsQ0FBQyxDQUFDLFFBQVEsQ0FBQyxHQUFHLEVBQUUsQ0FBQztTQUNqQztRQUNELE1BQU0sQ0FBQyxNQUFNLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxHQUFHLENBQUMsQ0FBQyxRQUFRLENBQUMsRUFBRSxNQUFNLENBQUMsQ0FBQztRQUNsRCxPQUFPLElBQUksQ0FBQztJQUNkLENBQUM7Q0FDRjs7Ozs7OztJQXJCQyx3QkFFTyIsInNvdXJjZXNDb250ZW50IjpbIi8qKiBUaGUgUm9vdCBjbGFzcyBmb3IgYWxsIENvbmZpZ3VyYXRpb25zLiAqL1xuZXhwb3J0IGFic3RyYWN0IGNsYXNzIENvbmZpZyB7XG4gIC8vIFRPRE8gdXNlIE1hcCAhISEhIChsaWtlIHNpbWkgZGlkIGluIEV2ZW50RW1pdHRlci50cylcbiAgLyoqIFRoZSBjb25maWcgb2JqZWN0LiAqL1xuICBwcml2YXRlIGNvbmZpZzoge1xuICAgIFtrZXk6IHN0cmluZ106IE9iamVjdCxcbiAgfSA9IHt9O1xuXG4gIC8qKiBUaGlzIG1ldGhvZCBpcyBhIGdldHRlciBhbmQgc2V0dGVyIGZvciBjb25maWd1cmF0aW9ucy4gVGhlIGtleSBzdGFuZHMgZm9yIHRoZSBjb25maWcgKGUuZy4gbW9kZWwpLlxuICAgKiBUaGUgcHJvcGVydHkgaXMgYSBzdWIgcHJvcGVydHkgaWYgdGhlIGNvbmZpZyAoZS5nLiBmaWVsZHMgPT4gbW9kZWwuZmllbGRzKS5cbiAgICogSWYgbm8gY29uZmlnIGlzIGdpdmVuLCB0aGUgbWV0aG9kIGp1c3QgcmV0dXJucyB0aGUgY29uZmlndXJhdGlvbiBmb3IgdGhlIGdpdmVuIHByb3BlcnR5LlxuICAgKiBJZiBhIGNvbmZpZyBpcyBnaXZlbiwgdGhlIHByb3BlcnR5IGNvbmZpZyBpcyBtZXJnZWQgdmlhIE9iamVjdC5hc3NpZ24uICovXG4gIHB1YmxpYyBjb25maWd1cmU/KGtleTogc3RyaW5nLCBwcm9wZXJ0eTogc3RyaW5nLCBjb25maWc/OiBPYmplY3QpIHtcbiAgICBpZiAoIXRoaXMuY29uZmlnW2tleV0pIHtcbiAgICAgIHRoaXMuY29uZmlnW2tleV0gPSB7fTtcbiAgICB9XG4gICAgaWYgKCFjb25maWcpIHtcbiAgICAgIHJldHVybiB0aGlzLmNvbmZpZ1trZXldW3Byb3BlcnR5XTtcbiAgICB9XG4gICAgaWYgKCF0aGlzLmNvbmZpZ1trZXldW3Byb3BlcnR5XSkge1xuICAgICAgdGhpcy5jb25maWdba2V5XVtwcm9wZXJ0eV0gPSB7fTtcbiAgICB9XG4gICAgT2JqZWN0LmFzc2lnbih0aGlzLmNvbmZpZ1trZXldW3Byb3BlcnR5XSwgY29uZmlnKTtcbiAgICByZXR1cm4gdGhpcztcbiAgfVxufVxuIl19