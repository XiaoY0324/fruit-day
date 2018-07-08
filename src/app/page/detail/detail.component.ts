import { Component, OnInit, ViewContainerRef} from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { NgbDropdownModule } from '@ng-bootstrap/ng-bootstrap';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { ToastsManager } from 'ng2-toastr/ng2-toastr';

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
  goodsInfo: object = {};
  orderInfo: orderParam = { count: 1, adress: '上海' };
  adreeList: string[] = ['上海', '上海郊区', '江苏', '浙江', '安徽', '北京', '天津', '河北', '广东'];

  constructor(private http: HttpClient,
              private vRef: ViewContainerRef,
              private toastr: ToastsManager,
              private activatedRoute: ActivatedRoute,
              private router: Router) {
    this.toastr.setRootViewContainerRef(vRef);
    console.log(router.routerState.snapshot.url);
  }

  ngOnInit() {
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
}
