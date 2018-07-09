import { Component, OnInit, ViewContainerRef } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ToastsManager } from 'ng2-toastr/ng2-toastr';

@Component({
  selector: 'app-shop-car',
  templateUrl: './shop-car.component.html',
  styleUrls: ['./shop-car.component.scss']
})
export class ShopCarComponent implements OnInit {
  cartList: object[] = [];
  uid: string;
  priceAmount: number = 0;

  constructor(private http: HttpClient, private vRef: ViewContainerRef, private toastr: ToastsManager) {
    this.toastr.setRootViewContainerRef(vRef);
  }

  ngOnInit() {
    this.uid = localStorage.getItem('user') ? JSON.parse(localStorage.getItem('user')).uid : '';
    this.getCartList();
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
}
