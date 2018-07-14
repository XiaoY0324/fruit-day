import { Component, OnInit, ViewContainerRef, Input } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ToastsManager } from 'ng2-toastr/ng2-toastr';
import { NgbModal, NgbActiveModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import { UUID } from 'angular2-uuid';

import { Router } from '@angular/router';

// 弹框
@Component({
  selector: 'pay-modal',
  templateUrl: './pay-modal.html'
})
export class PayModal {
  @Input() name;

  constructor(public activeModal: NgbActiveModal) {}

  click(payWay) {
    console.log('wowo', payWay);
    this.activeModal.close(payWay);
  }
}


@Component({
  selector: 'app-shop-car',
  templateUrl: './shop-car.component.html',
  styleUrls: ['./shop-car.component.scss']
})
export class ShopCarComponent implements OnInit {
  cartList: object[] = [];
  uid: string;
  mobile: any;
  priceAmount: number = 0;

  constructor(private http: HttpClient, private vRef: ViewContainerRef, private toastr: ToastsManager, private modalService: NgbModal, private router: Router) {
    this.toastr.setRootViewContainerRef(vRef);
  }

  ngOnInit() {
    this.uid = localStorage.getItem('user') ? JSON.parse(localStorage.getItem('user')).uid : '';
    this.mobile = localStorage.getItem('user') ? JSON.parse(localStorage.getItem('user')).mobile : '';
    this.getCartList();
    console.log(UUID.UUID());
  }

   open() {
    const modalRef = this.modalService.open(PayModal);

    modalRef.componentInstance.curStep = 0; // 实例 当前状态时第一步
    modalRef.componentInstance.payWay = '余额'; // 付款方式 默认余额

    modalRef.result.then(val => {
      this.submit(val);
    }, (reason) => {
      console.log(`Dismissed ${this.getDismissReason(reason)}`);
    });
  }

  // 支付弹框逻辑
  submit(val) {
    const modalRefStep2 = this.modalService.open(PayModal); // 开第二个弹框实例

    modalRefStep2.componentInstance.curStep = 1; // 实例 当前状态时第一步
    modalRefStep2.componentInstance.payWay = val; // 付款方式 默认余额

    modalRefStep2.result.then(op => {
      if (op === 'pay') {
        setTimeout(() => this.router.navigate(['/home']), 1000);
        this.toastr.success('付款成功', '😊');
        // this.router.navigate(['home']);
        return;
      } else if (op === 'cancle') {
        setTimeout(() => this.router.navigate(['/home']), 1000);
        this.toastr.info('订单未支付哦', '😊');
        return;
      }
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

  getCartList() {
    // 购物车内 商品列表数据
    this.http.get(`http://localhost:8989/aws/goods/cart_list?uid=${ this.uid }`, {
       withCredentials: true
     }).subscribe(data => {
        this.cartList = (data as any).result;
        this.countOrder();
        console.log(this.cartList);
      }, () => {
      this.toastr.error('获取购物车信息失败', '😣');
    });
  }

  // 计算总价
  countOrder() {
    this.priceAmount = 0;
    (this.cartList as any).map(list => this.priceAmount += list.goodsCnt * list.price);
  }

  deleteGood(goodsId) {
    // 购物车内 商品列表数据
    this.http.delete(`http://localhost:8989/aws/goods/cart_list?uid=${ this.uid }&goods_id=${ goodsId }`, {
       withCredentials: true
      }).subscribe(data => {
        this.toastr.success('删除成功', '😊');
        this.getCartList();
      }, () => {
      this.toastr.error('获取购物车信息失败', '😣');
    });
  }

  // 修改数量
  modCount(flag, index) {
    if (flag) (this.cartList[index] as any).goodsCnt ++;
      else if ((this.cartList[index] as any).goodsCnt > 1) (this.cartList[index] as any).goodsCnt --;
        else return this.toastr.error('至少要选择一件商品', '😣');

    this.countOrder();
  }

  // 去结算 (生成订单信息 -> 支付)
  createOrder() {
    const params = {
      uid: this.uid, // 登录人的uid
      orderNo: UUID.UUID(), // 订单编号时间戳
      orderStatus: -2, // -2 未付款订单
      totalMoney: this.priceAmount, // 订单总金额
      deliverMoney: 10, // 运费 默认10
      payType: 1, // 在线支付
      isSelf: 0, // 不自提
      userAddress: '上海',// 地址
      userPhone: this.mobile,
      isRefund: 0, // 是否退款
      refundRemark: '', // 退款备注
    };

    // 生成订单
    this.http.post(`http://localhost:8989/aws/goods/create_order`, params, {
       withCredentials: true
      }).subscribe(data => {

        console.log(data);
      }, () => {
      this.toastr.error('生成订单失败', '😣');
    });
  }

  // 结算按钮点击
  pay() {
    if (!this.cartList.length) return this.toastr.error('购物车暂时没有商品哦~', '😣');

    this.createOrder();

    this.open();
  }
}
