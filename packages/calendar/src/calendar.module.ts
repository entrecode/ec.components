import { NgModule, ModuleWithProviders } from '@angular/core';

@NgModule({
    imports: [],
    exports: [],
    declarations: [],
    providers: [],
})
export class CalendarModule {
    static forRoot({ dateFormat, timeFormat, monthFormat }: { dateFormat?, timeFormat?, monthFormat?}): ModuleWithProviders {
        return {
            ngModule: CalendarModule,
            providers: [
                {
                    provide: 'moment.format.date',
                    useValue: dateFormat
                },
                {
                    provide: 'moment.format.time',
                    useValue: timeFormat
                },
                {
                    provide: 'moment.format.month',
                    useValue: monthFormat
                },
            ]
        }
    }
}
