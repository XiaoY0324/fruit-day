import { Component, OnInit, ViewContainerRef, Input } from '@angular/core';
import { ToastsManager } from 'ng2-toastr/ng2-toastr';
import { HttpClient } from '@angular/common/http';
import { NgbModal, NgbActiveModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { AddCartComponent } from '../../shared/add-cart/add-cart.component';
import { environment } from '../../../environments/environment';

interface goodsParams {
  goodsSpec: string
}

interface goodsInfo {
  userId: number,
  goodsId: number,
  goodsCnt: number
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
              private modalService: NgbModal,
              private router: Router) {
    this.toastr.setRootViewContainerRef(vRef);
  }

  ngOnInit() {
    this.user = localStorage.getItem('user') ? JSON.parse(localStorage.getItem('user')) : { uid: '' };
    this.goodsInfo.userId = (this.user as any).uid;

    this.getList();
  }

  getList(filterLabel?: string) {
    const queryPar = filterLabel ? `/filter=${ filterLabel }` : '';

   // 商品列表数据
    this.http.get('http://localhost:8989/aws/goods/goods_list' + queryPar, {
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
    const modalRef = this.modalService.open(AddCartComponent);

    modalRef.componentInstance.name = 'World';
    modalRef.result.then(val => {
      if (val === `结算`) window.open(`${ environment.tiantian }/shop_car`, '_blank')
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
