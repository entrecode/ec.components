import { Component, OnInit, PipeTransform, Pipe, Injectable } from '@angular/core';
import { IconService } from '@ec.components/ui';
import { ecIcons } from '@ec.components/ui';
import { emojiIcons } from '@ec.components/ui';
import { NotificationsService } from '@ec.components/ui';

@Component({
  selector: 'ec-icon-demo',
  templateUrl: 'icon-demo.component.html',
})
export class IconDemoComponent implements OnInit {
  icons: string[];
  sets = [{ label: 'Emoji Icons', set: emojiIcons }, { label: 'ec-icons', set: ecIcons }];
  query = '';
  constructor(public iconService: IconService, private notificationsService: NotificationsService) {}

  useSet(set) {
    this.iconService.use(set);
    this.notificationsService.emit({
      type: 'info',
      title: 'Iconset geändert!',
      message: 'Das Set ist jetzt in der ganzen App aktiv',
    });
  }

  ngOnInit() {}
}
