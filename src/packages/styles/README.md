# @ec.components/styles

This package contains all the more sophisticated components styles.

## Import Method 1

If you just want to have styles that work, import them like this:

```
@import "../node_modules/xlcss/sass/xlcss";
@import "../node_modules/@ec.components/styles/default";
```


The default style contains a generic config for colors and fonts.

## Import Method 2
If you want to use your own color map and configuration, import the following:

```
@import "../node_modules/xlcss/sass/xlcss";
@import "~@ec.components/styles/config"; #replace
@import "~@ec.components/styles/core/core"; #replace
@import "~@ec.components/styles/styles";
```

The lines with "#replace" are meant to be replaced with your own config that has a similar structure like the ones provided.

### Config Options
Have a look at [the default config](./config.scss) to find out which config options should be set. It is recommended that you copy the file contents and change the values you'd like to customize.

### Color and Font Options
At the the core folder, you can find the available [color](./core/_colors.scss) and [font](./core/_typo.scss) settings.
