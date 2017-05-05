import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Subject } from 'rxjs';
@Component({
  selector: 'ec-filter',
  templateUrl: './filter.component.html',
  styleUrls: ['./filter.component.scss']
})
export class FilterComponent implements OnInit {
  private query: string;
  private source = new Subject();
  /** Observable that is nexted when the query has changed. */
  public change$ = this.source.asObservable();
  /** This EventEmitter calls when the query has changed.*/
  @Output() changed: EventEmitter<any> = new EventEmitter();
  /** Debounce time in ms for the change EventEmitter to fire. Defaults to 200. */
  @Input() debounce: number = 200;

  constructor() {
  }

  ngOnInit() {
    this.change$.debounceTime(this.debounce)
    .subscribe((q) => {
      this.changed.emit(q);
    });
  }
}
