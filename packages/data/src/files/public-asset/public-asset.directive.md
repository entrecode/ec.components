# ecPublicAsset

This directive can be used to load a single entry directly from the template:

```html
<div ecPublicAsset assetId="f663ba74-d33b-499f-a37c-9a5b4cf94543"
     #myAsset="ecPublicAsset"></div>
<img [src]="myAsset.asset?.getImageThumbUrl()" *ngIf="myAsset.asset">
```