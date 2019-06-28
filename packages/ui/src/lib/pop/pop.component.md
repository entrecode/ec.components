# Pop

A Pop is not just a modal, but a section of markup that appears (pops) anywhere and with any style on your page.

## Usage

```html
<ec-pop class="modal-wrapper" #myPop>
  <div class="modal">
    <a (click)="myPop.hide()" class="modal__dismiss">Close</a>
    <header class="modal__header">
    </header>
    <div class="modal__body">
        Some body content
    </div>
    <footer class="modal__footer">
        This is the footer
    </footer>
  </div>
</ec-pop>
<button (click)="myPop.show()">Show pop</button>
```

The default pop classes [can be looked up here](https://github.com/entrecode/ec.components/blob/master/packages/style/pop/ec-pop.scss).