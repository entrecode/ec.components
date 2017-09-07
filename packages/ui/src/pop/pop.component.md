# Pop

A Pop is not just a modal, but a section of markup that appears (pops) anywhere and with any style on your page.

```html
<button (click)="popLeft.show()">sidebar-left</button>
<button (click)="popRight.show()">sidebar-right</button>
<ec-pop #popLeft class="sidebar-left">
  <button (click)="popLeft.hide()">X</button>
  <h1>YEHA!</h1>
</ec-pop>
<ec-pop #popRight class="sidebar-right" active="true">
  <h1>Yupidoodle!</h1>
  <button (click)="popRight.hide()">cloooose</button>
</ec-pop>
```

By using CSS classes, you can define your own styling and behaviour of the pop.
The default classes can be looked up in pop.component.scss.