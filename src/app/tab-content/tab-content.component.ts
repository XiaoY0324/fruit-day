import { Component, OnInit, Input } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';

@Component({
  selector: 'tab-content',
  template: `
    <div class="tab-content">
      <div class="content">
        <router-outlet></router-outlet>
       </div>
     </div>`,
  styleUrls: ['./tab-content.component.scss']
})
export class TabContentComponent implements OnInit {
  @Input() nowLab: string = '生平';
  isLoading: boolean = true; // 只有在上面声明了 页面才能访问到

  constructor(private http: HttpClient) {}

  ngOnInit() {
    setTimeout(() => {
      this.isLoading = false;
    }, 1000);

    this.http.get(`https://yangshuaiweb.com:3000/home/user/`).subscribe(data => {
      console.log(data);
    });
  }
}
