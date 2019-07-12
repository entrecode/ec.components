import { Component, OnInit } from '@angular/core';
import { KeycommandsService, NotificationsService } from '@ec.components/ui';

@Component({
  selector: 'ec-keycommands-demo',
  template: `
    <input type="text" [(ngModel)]="textToCopy" />
    <a class="btn" (click)="keycommands.copyToClipBoard(textToCopy, 'Text')">copy text</a>
    <ec-notifications></ec-notifications>
  `,
})
export class KeycommandsDemoComponent implements OnInit {
  textToCopy;
  constructor(public keycommands: KeycommandsService, public notificationService: NotificationsService) {
    this.keycommands.register({
      key: 'π',
      description: 'Press π',
      canActivate: () => true,
      action: (e) => {
        this.notificationService.emit({
          type: 'success',
          title: 'PRESSED π!',
        });
      },
    });
  }

  ngOnInit() {}
}
