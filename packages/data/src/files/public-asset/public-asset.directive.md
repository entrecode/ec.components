# ecPublicAsset

This directive can be used to load a single entry directly from the template:

```html
<h1 ecPublicAsset assetId="SkXEhDZ5yW" #asset="ecPublicAsset"></h1>
<img [src]="asset.getThumbUrl()">
```