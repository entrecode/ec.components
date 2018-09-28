import { Component, ViewChild, OnChanges, OnInit } from '@angular/core';

@Component({
  templateUrl: './modal-demo.component.html',
})
export class ModalDemoComponent implements OnChanges, OnInit {
  modalMode;
  modalBackdrop = true;
  modalColumns;
  modalMarkup;
  showFillText = false;
  showFooter = true;
  showHeader = true;
  showMarkup = false;
  modalAnimate;

  ngOnChanges() {
    this.updateMarkup()
  }

  ngOnInit() {
    this.updateMarkup();
  }

  updateMarkup() {
    setTimeout(() => {
      this.modalMarkup = `
      <ec-modal${this.modalMode ? `
          mode="${this.modalMode}"` : ''}${this.modalBackdrop ? `
          [backdrop]="${this.modalBackdrop}"` : ''}${this.modalColumns ? `
          [columns]="${this.modalColumns}"` : ''}>
        ${this.showHeader ? `<div class="modal-header">
          <h4><!-- header --></h4>
        </div>` : ''}
        <div class="modal-body">
          <!-- body -->
        </div>
        ${this.showFooter ? `<div class="modal-footer">
          <!-- footer -->
        </div>` : ''}
      </ec-modal>
      `;
    });
  }

}
