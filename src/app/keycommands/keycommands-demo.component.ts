import { Component, OnInit } from '@angular/core';
import { KeycommandsService } from '@ec.components/ui';

@Component({
  selector: 'ec-keycommands-demo',
  template: `
  <input type="text" [(ngModel)]="textToCopy"/>
  <a class="btn" (click)="keycommands.copyToClipBoard(textToCopy,'Text')">copy text</a>
  <ec-notifications></ec-notifications>
  `
})

export class KeycommandsDemoComponent implements OnInit {
  constructor(
    public keycommands: KeycommandsService
  ) { }

  ngOnInit() { }
}