import { Component, OnInit, ViewContainerRef, Input } from '@angular/core';
import { ToastsManager } from 'ng2-toastr/ng2-toastr';
import { HttpClient } from '@angular/common/http';
import { NgbModal, NgbActiveModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';

interface goodsParams {
  goodsSpec: string
}

interface goodsInfo {
  userId: number,
  goodsId: number,
  goodsCnt: number
}

// 弹框
@Component({
  selector: 'ngbd-modal-content',
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
      <button type="button" class="btn btn-light" (click)="activeModal.close('Close click')">去结算</button>
    </div>
  `
})
export class NgbdModalContent {
  @Input() name;

  constructor(public activeModal: NgbActiveModal) {}
}

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
  providers: []
})
export class HomeComponent implements OnInit {
  images: string[] = ['https://yangshuaiweb.com:9913/banner1.png', 'https://yangshuaiweb.com:9913/banner2.png', 'https://yangshuaiweb.com:9913/banner3.png', 'https://yangshuaiweb.com:9913/banner4.png'];
  goods: goodsParams[]; // 商品详情
  user: object = { uid: '' };
  goodsInfo: goodsInfo = { userId: 0, goodsId: 0, goodsCnt: 1 };


  constructor(private http: HttpClient,
              private vRef: ViewContainerRef,
              private toastr: ToastsManager,
              private modalService: NgbModal) {
    this.toastr.setRootViewContainerRef(vRef);
  }

  ngOnInit() {
    this.user = localStorage.getItem('user') ? JSON.parse(localStorage.getItem('user')) : { uid: '' };
    this.goodsInfo.userId = (this.user as any).uid;

    // 商品列表数据
    this.http.get('http://localhost:8989/aws/goods/goods_list', {
       withCredentials: true
     }).subscribe(data => {
        this.goods = (data as any).goods;
      }, () => {
      this.toastr.error('获取商品信息失败', '😣');
    });
  }

  filterGift(type: string) {
     return this.goods.filter(item => item.goodsSpec === type);
  }

  open(goodsId) {
    this.addShopCar(goodsId);
    const modalRef = this.modalService.open(NgbdModalContent);

    modalRef.componentInstance.name = 'World';
    modalRef.result.then(val => {
      console.log(val);
    }, (reason) => {
      console.log(`Dismissed ${this.getDismissReason(reason)}`);
    });
  }

  private getDismissReason(reason: any): string {
    // console.log(ModalDismissReasons);
    if (reason === ModalDismissReasons.ESC) {
      return 'by pressing ESC';
    } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
      return 'by clicking on a backdrop';
    } else {
      return  `with: ${reason}`;
    }
  }

  addShopCar(goodsId) {
    this.goodsInfo.goodsId = goodsId;
    console.log( this.goodsInfo);

    // 添加购物车
    this.http.post('http://localhost:8989/aws/goods/add_cart', this.goodsInfo, {
       withCredentials: true
     }).subscribe(data => {
        console.warn(data);
      }, () => {
      this.toastr.error('添加购物车失败', '😣');
    });

  }
}
