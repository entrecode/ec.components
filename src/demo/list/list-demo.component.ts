import { Component } from '@angular/core';
import { songs } from '../../assets/songs';
import { List } from '../../packages/core/list/list';
import { mocked } from '../../mocks/data';

@Component({
  selector: 'ec-list-demo',
  templateUrl: './list-demo.component.html',
})
export class ListDemoComponent {
  private mocked = mocked;
  private songs = new List(songs.songs, {
    size: 10,
    fields: {
      picture: {
        label: 'Bild',
        resolve: (body) => body.music.measures.length
      },
      music: {
        label: 'Akkorde',
        display: (value) => value.measures.reduce((chords, measure) => chords.concat(measure), []),
        sort: (value) => value.measures.length,
        view: 'labels'
      },
      title: {
        label: 'Titel',
        view: 'string'
      },
      composer: {
        label: 'Komponist',
        view: 'string'
      },
      style: {
        label: 'Stil',
        group: (value) => value,
        view: 'string'
      },
      key: {
        label: 'Tonart',
        group: (value) => value.replace('-', ''),
        view: 'string'
      },
      density: {
        label: 'Dichte',
        hidden: true,
        resolve: (body) => {
          return Math.round(body.music.measures.reduce((chords, measure) => chords.concat(measure), []).length / body.music.measures.length * 10) / 10;
        }
      },
      diversity: {
        label: 'Diversität',
        hidden: true,
        resolve: (body) => {
          return body.music.measures.reduce((chords, measure) => chords.concat(measure), []).filter((v, i, a) => a.indexOf(v) === i).length;
        }
      },
      difficulty: {
        label: 'Schwierigkeit',
        resolve: (body, item) => {
          return Math.round(item.resolve('diversity') * item.resolve('density'));
        },
        group: (value) => {
          if (value < 5) {
            return 'Käseleicht'
          }
          if (value < 10) {
            return 'Anfänger'
          }
          if (value < 30) {
            return 'Ganz nett'
          }
          if (value < 40) {
            return 'Fortgeschritten'
          }
          if (value < 50) {
            return 'Ordentlich'
          }
          if (value < 60) {
            return 'Profi'
          }
          return 'Hardcore'
        }
      },
    }
  });
}
