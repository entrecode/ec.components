import { Component, ViewChild, OnChanges, OnInit } from '@angular/core';

@Component({
  templateUrl: './modal-demo.component.html',
})
export class ModalDemoComponent implements OnChanges, OnInit {
  modalMode = '';
  modalPreset = '';
  modalBackdrop = true;
  modalColumns;
  modalMarkup;
  showFillText = false;
  showFooter = true;
  showHeader = true;
  showMarkup = false;

  ngOnChanges() {
    this.updateMarkup();
  }

  ngOnInit() {
    this.updateMarkup();
  }

  updateMarkup() {
    setTimeout(() => {
      this.modalMarkup = `
      <a (click)="yourModal.show()">open</a>
      <ec-modal #yourModal${
        this.modalMode
          ? `
          mode="${this.modalMode}"`
          : ''
      }${
        this.modalBackdrop
          ? `
          [backdrop]="${this.modalBackdrop}"`
          : ''
      }${
        this.modalColumns
          ? `
          [columns]="${this.modalColumns}"`
          : ''
      }>
        ${
          this.showHeader
            ? `<header>
          <h4>Header</h4>
        </header>`
            : ''
        }
        <p>Body</p>
        ${
          this.showFooter
            ? `<footer>
          Footer
        </footer>`
            : ''
        }
      </ec-modal>
      `;
    });
  }
}
