import { Component, OnInit, ViewChild } from '@angular/core';
import { FormComponent, LoaderComponent, LoaderService, WithLoader } from '@ec.components/ui';
import { Form } from '@ec.components/core';

@Component({
  templateUrl: './loader-demo.component.html',
})
export class LoaderDemoComponent implements OnInit, WithLoader {
  public classes = ['', 'is-local', 'is-global'];
  @ViewChild('loader', { static: true }) loader: LoaderComponent;
  public options: Form<any>;
  @ViewChild('optionsForm', { static: true }) optionsForm: FormComponent<any>;

  constructor(private loaderService: LoaderService) {}

  ngOnInit() {
    this.options = new Form(
      {
        time: 2000,
        hostClass: this.classes[0],
        desktop: false,
        title: 'The Toast is hot',
        message: 'The temperature of your white bread has risen to improve its crisp factor to the optimum!',
        type: 'success',
      },
      {
        fields: {
          time: {
            label: 'Zeit in ms',
            view: 'number',
          },
          hostClass: {
            label: 'Klasse',
            view: 'select',
            values: this.classes,
          },
        },
      },
    );
  }

  emit({ type, title, message, time }) {
    this.loaderService.wait(new Promise((resolve) => setTimeout(resolve, time)), this.loader);
  }
}
