import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { NotificationsService } from '../../notifications/notifications.service';

export interface KeyAction {
  key: string;
  description: string;
  action: (e?) => void;
  canActivate?: (e?) => boolean;
}

@Injectable()
export class KeycommandsService {
  keys: { [key: string]: KeyAction } = {};
  muted = false;
  input;
  meta = false;
  shift = false;

  constructor(public router: Router, public notificationsService: NotificationsService) {
    window.addEventListener('keydown', (e) => {
      if (e.altKey && this.keys[e.key]) {
        e.preventDefault();
        e.stopImmediatePropagation();
        e.stopPropagation();
      }
    });
    window.addEventListener('keyup', (e) => {
      if ((!this.muted || e.altKey) && this.keys[e.key]) {
        this.activate(this.keys[e.key], e);
      }
    });
    window.addEventListener('mousedown', (e) => {
      this.meta = e.metaKey;
    });
    // prevents shortcuts to be fired when inputs are focused
    document.addEventListener(
      'focus',
      (e) => {
        this.mute(e);
      },
      true,
    );

    document.addEventListener(
      'blur',
      (e) => {
        this.unmute(e);
      },
      true,
    );
  }

  mute(e?) {
    this.input = e.target;
    this.muted = true;
  }

  unmute(e?) {
    delete this.input;
    this.muted = false;
  }

  register(keyconfig: KeyAction) {
    this.keys[keyconfig.key] = keyconfig;
    return this;
  }

  activate(keyconfig: KeyAction, e?) {
    if (!keyconfig.canActivate(e)) {
      return;
    }
    keyconfig.action(e);
  }

  copyToClipBoard(value, label) {
    const el = document.createElement('textarea');
    el.value = value;
    document.body.appendChild(el);
    el.select();
    document.execCommand('copy');
    document.body.removeChild(el);

    this.notificationsService.emit({
      title: `${label} has been copied to the clipboard`,
      message: value,
      type: 'info',
    });
  }

  copyCellToClipboard(label = 'Cell') {
    return (item, property) => {
      this.copyToClipBoard(JSON.stringify(item.resolve(property) || ''), label);
    };
  }

  openUrl(url) {
    window.open(url, '_blank');
  }

  navigate(path: string[], options = {}) {
    if (this.meta) {
      this.openUrl(this.router.serializeUrl(this.router.createUrlTree(path, options)));
    } else {
      this.router.navigate(path, options);
    }
  }
}
