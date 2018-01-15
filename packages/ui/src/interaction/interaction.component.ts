import { Component, OnInit, Input, ViewChild } from '@angular/core';
import { LoaderComponent } from '../loader/loader.component';
import 'rxjs/add/operator/debounceTime';
import { Observable } from 'rxjs/Observable';
import { Subject } from 'rxjs/Subject';
import { Interaction } from '../../../core/src/interaction/interaction';

@Component({
    selector: 'ec-interaction',
    templateUrl: './interaction.component.html'
})

export class InteractionComponent implements OnInit {
    interaction: Interaction<any>;

    @Input() root: Interaction<any>;
    query = '';

    private change = new Subject();
    /** Observable that is nexted when the query has changed. */
    public change$: Observable<any> = this.change.asObservable();

    ngOnInit() {
        console.log('init', this.root);
        this.interaction = this.root;
    }
    typed(query) {
        this.change.next(query);
    }

    filter(query = this.query) {
        /* if (query) {
            this.displayedActions = this.actions
                .filter(action => action.sticky || action.label.toLowerCase().indexOf(query.toLowerCase()) !== -1);
        } else {
            this.displayedActions = this.actions;
        } */
    }

    goBack() {
        /* if (this.path.length < 2) {
            return;
        }
        this.path.shift();
        this.perform(this.path[0], true); */
    }
}
