import { Component, OnInit, Input } from '@angular/core';
import { NgbModal, NgbActiveModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';

// 弹框
@Component({
  selector: 'add-cart-component',
  templateUrl: './add-cart.component.html'
})
export class AddCartComponent {
  @Input() name;

  constructor(public activeModal: NgbActiveModal) {}
}
