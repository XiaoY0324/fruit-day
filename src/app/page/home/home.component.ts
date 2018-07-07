import { Component, OnInit, ViewContainerRef } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ToastsManager } from 'ng2-toastr/ng2-toastr';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
  providers: [NgbModal]
})
export class HomeComponent implements OnInit {
  images: string[] = ['https://yangshuaiweb.com:9913/banner1.png', 'https://yangshuaiweb.com:9913/banner2.png', 'https://yangshuaiweb.com:9913/banner3.png', 'https://yangshuaiweb.com:9913/banner4.png'];

  constructor(private http: HttpClient,
              private vRef: ViewContainerRef,
              private toastr: ToastsManager) { }

  ngOnInit() {
    // 商品列表数据
    this.http.get('http://localhost:8989/aws/goods/goods_list', {
       withCredentials: true
     })
    .subscribe(
      data => {
        console.log(data);
        // this.recent_deadline = (<any>data).data.recent_deadline.length ? (<any>data).data.recent_deadline : [];
        // this.recent_click = (<any>data).data.recent_click.length ? (<any>data).data.recent_click : [];
      }, () => {
      this.toastr.error('获取商品信息失败', '😣');
    });
  }

}
