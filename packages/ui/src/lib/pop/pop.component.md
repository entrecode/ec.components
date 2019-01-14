# Pop

A Pop is not just a modal, but a section of markup that appears (pops) anywhere and with any style on your page.

## Usage

```html
<ec-pop class="dialog" #myPop>
    <header class="dialog-header">
        <a (click)="myPop.hide()">Close</a>
    </header>
    <div class="dialog-body">
        Some body content
    </div>
    <footer class="dialog-footer">
        This is the footer
    </footer>
</ec-pop>
<button (click)="myPop.show()">Show pop</button>
```

The default pop classes [can be looked up here](https://github.com/entrecode/ec.components/blob/master/packages/style/pop/ec-pop.scss).