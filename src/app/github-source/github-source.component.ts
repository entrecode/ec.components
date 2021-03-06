import { Component, OnInit, Input } from '@angular/core';
import { NotificationsService } from '@ec.components/ui';

@Component({
  selector: 'ec-github-source',
  templateUrl: './github-source.component.html',
  styleUrls: ['./github-source.component.scss'],
})
export class GithubSourceComponent implements OnInit /* , OnChanges */ {
  @Input() path;
  @Input() base = 'entrecode/ec.components';
  @Input() branch = 'master/src/app';
  @Input() mode = 'typescript';
  @Input() theme = 'monokai';
  source = '';
  constructor(public notificationsService: NotificationsService) {}

  ngOnInit() {
    this.loadSource();
  }

  loadSource(path = this.path) {
    if (!this.path) {
      return '';
    }
    const url = `https://raw.githubusercontent.com/${this.base}/${this.branch}/${this.path.replace(
      'https://github.com/',
      '',
    )}`;
    fetch(url)
      .then((data) => data.text())
      .then((source) => (this.source = source))
      .catch((error) => {
        console.log('error', error, url);
        this.notificationsService.emit({
          title: 'Could not fetch github source',
          error,
        });
      });
  }
}
