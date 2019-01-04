# ec.components/calendar

This package contains some handy calendar modules:

- ec-calendar: A calendar view
- ec-month: Just a month
- ec-daterange: Displays a range of time in a calendar
- ec-datetime: Form component to hold a datetime.

## Config

To configure the format of the date strings, you can import the module using forRoot:

```ts
@NgModule({
    imports: [
        /* ... */
        CalendarModule.forRoot({
            dateFormat: 'DD.MM.YYYY',
            timeFormat: 'HH:mm',
            monthFormat: 'MMMM YYYY',
        })
    ]
})
```

## Usage

```html
<ec-datetime></ec-datetime>
<ec-calendar></ec-calendar>
<ec-heatmap [timestamps]="timestamps"></ec-heatmap>
<!-- timestamps could be ['2018-05-04T14:23:31.983Z', '2018-05-04T14:22:46.743Z', '2018-05-04T14:09:39.592Z'] -->
<ec-month></ec-month>
```