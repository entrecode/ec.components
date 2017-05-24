# @ec.components/styles

This package contains all the more sophisticated components styles.
You can import the styles like this:

```
@import "../node_modules/xlcss/sass/xlcss";
# webpack alternative: @import "~/xlcss/sass/xlcss";
#you can either import the default config/core or use your own with the same structure
@import "~@ec.components/styles/config";
@import "~@ec.components/styles/core/core";
@import "~@ec.components/styles";
```

If you want to use your own colors and fonts etc you can just replace the config and core/core imports with you own.