import { Component, OnInit } from '@angular/core';
import { SdkService } from '../../../packages/data';

@Component({
    selector: 'ec-signup-demo',
    templateUrl: './signup-demo.component.html'
})

export class SignupDemoComponent implements OnInit {

    invite = 'lahsdlkajshld';

    constructor(public sdk: SdkService) { }

    ngOnInit() { }
}
