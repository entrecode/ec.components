import { Component } from '@angular/core';
import { adjektive } from '../../mocks/adjektive';
import { irregular_verbs } from '../../mocks/irregular_verbs';
import { regular_verbs } from '../../mocks/regular_verbs';
import { List } from "../../../index";
import { substantives } from '../../mocks/substantives';

@Component({
  template: `
<h2>List Transforms Test</h2>

<ec-list class="ec-list-card" [list]="words" (selected)="log($event)" #wordList></ec-list>
<ul>
  <li *ngFor="let word of wordList.selection.items">
    {{word.resolve('word')}}
  </li>
</ul>
`
})
export class ListTransformsDemoComponent {
  private percent = (value) => Math.round(100 * value) + '%';
  private german = [...irregular_verbs, ...regular_verbs, ...adjektive, ...substantives];
  public words = new List(this.german.filter(word => !!word)
    .map((word) => {
      return { word }
    }), {
      identifier: 'word',
      size: 100,
      fields: {
        word: {
          label: 'Wort',
          sortable: true,
          filterable: true,
          view: 'string'
        },
        length: {
          label: 'Länge',
          resolve: (body) => body.word.length,
          group: (value) => value + ' Buchstaben',
          sortable: true
        },
        vocales: {
          label: 'Vokale',
          resolve: (body) => (body.word.toLowerCase().match(/(a|e|i|o|u|y|ü|ä|ö+)/g) || ''),
          sort: (value) => value.length,
          display: (value) => value.length,
          list: false,
          sortable: true
        },
        vocality: {
          label: 'Vokalität',
          resolve: (body, item) => item.sort('vocales') / body.word.length,
          display: this.percent,
          sortable: true
        },
        vocale_diversity: {
          label: 'Vokalvielfalt',
          resolve: (body, item) => Array.from(new Set(item.resolve('vocales'))),
          sort: (value) => value.length,
          display: (value) => value.length,
          list: false,
          sortable: true
        },
        fast_consonants: {
          label: 'Schnelle Konsonanten',
          resolve: (body) => (body.word.toLowerCase().match(/(k|g|d|b|l|t|p+)/g) || ''),
          sort: (value) => value.length,
          display: (value) => value.length,
          list: false,
          sortable: true
        },
        fast_consonant_diversity: {
          label: 'Konsonantenvielfalt',
          resolve: (body, item) => Array.from(new Set(item.resolve('fast_consonants'))),
          sort: (value) => value.length,
          display: (value) => value.length,
          list: false,
          sortable: true
        },
        speed: {
          label: 'Konsonanz',
          resolve: (body, item) => item.sort('fast_consonants') / body.word.length,
          display: this.percent,
          sortable: true
        },
        flow: {
          label: 'Fluss',
          resolve: (body, item) => (item.sort('vocales') * item.sort('fast_consonants')) / Math.max(1, body.word.length * item.sort('fast_consonant_diversity') * item.sort('vocale_diversity')),
          display: this.percent,
          sortable: true
        }
      }
    }
  )
  ;

  log(wort) {
    console.log('log', wort);
  }
}
