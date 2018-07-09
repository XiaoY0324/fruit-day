import { Component, OnInit, ViewContainerRef} from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { NgbModal, NgbActiveModal, ModalDismissReasons, NgbDropdownModule } from '@ng-bootstrap/ng-bootstrap';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { ToastsManager } from 'ng2-toastr/ng2-toastr';
import { AddCartComponent } from '../../shared/add-cart/add-cart.component';

interface orderParam {
  count: number,
  adress: string,
}

@Component({
  selector: 'app-detail',
  templateUrl: './detail.component.html',
  styleUrls: ['./detail.component.scss'],
  providers: [NgbDropdownModule]
})
export class DetailComponent implements OnInit {
  goodsId: number = 0;
  goodsInfo: object = { goodsId: '' };
  orderInfo: orderParam = { count: 1, adress: '上海' };
  adreeList: string[] = ['上海', '上海郊区', '江苏', '浙江', '安徽', '北京', '天津', '河北', '广东'];
  user: object;

  constructor(private http: HttpClient,
              private vRef: ViewContainerRef,
              private toastr: ToastsManager,
              private activatedRoute: ActivatedRoute,
              private router: Router,
              private modalService: NgbModal) {
    this.toastr.setRootViewContainerRef(vRef);
    console.log(router.routerState.snapshot.url);
  }

  ngOnInit() {
    this.user = localStorage.getItem('user') ? JSON.parse(localStorage.getItem('user')) : { uid: '' };

    this.activatedRoute.params.subscribe((params: Params) => {
      this.goodsId = params['goodId'];
    });

    // 商品数据
    this.http.get(`http://localhost:8989/aws/goods/goods_detail?goodId=${ this.goodsId }`, {
       withCredentials: true
     }).subscribe(data => {
        this.goodsInfo = (data as any).result;
        // console.log(data);
      }, () => {
      this.toastr.error('获取商品信息失败', '😣');
    });
  }

  // 修改数量
  modCount(flag) {
    if (flag) this.orderInfo.count ++;
      else if (this.orderInfo.count > 1) this.orderInfo.count --;
        else this.toastr.error('至少要选择一件商品', '😣');
  }

  // 选择地区
  modArea(adress:string) {
    this.orderInfo.adress = adress;
  }

   open(goodsId) {
    if (!goodsId) return this.toastr.error('商品不存在', '😣');

    this.addShopCar(goodsId);
    const modalRef = this.modalService.open(AddCartComponent);

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
    // (this.goodsInfo as any).goodsId = goodsId;
    // console.log( this.goodsInfo);
    const params = {
      userId: (this.user as any).uid,
      goodsId: goodsId,
      goodsCnt: this.orderInfo.count
    }

    // 添加购物车
    this.http.post('http://localhost:8989/aws/goods/add_cart', params, {
       withCredentials: true
     }).subscribe(data => {
        console.warn(data);
      }, () => {
      this.toastr.error('添加购物车失败', '😣');
    });
  }
}
