import { Component, OnInit, Input } from '@angular/core';
import { NgbModal, NgbActiveModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';

// 弹框
@Component({
  selector: 'add-cart-component',
  template: `
    <div class="modal-header">
      <h4 class="modal-title">提示</h4>
      <button type="button" class="close" aria-label="Close" (click)="activeModal.dismiss('Cross click')">
        <span aria-hidden="true">&times;</span>
      </button>
    </div>
    <div class="modal-body">
      <p style="color: green;">加入购物车成功!</p>
    </div>
    <div class="modal-footer">
      <button type="button" class="btn btn-light" (click)="activeModal.close('Close click')">继续添加</button>
      <button type="button" class="btn btn-light" (click)="activeModal.close('结算')">去结算</button>
    </div>
  `
})
export class AddCartComponent {
  @Input() name;

  constructor(public activeModal: NgbActiveModal) {}
}
