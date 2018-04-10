import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-my-living',
  templateUrl: './my-living.component.html',
  styleUrls: ['./my-living.component.scss']
})
export class MyLivingComponent implements OnInit {
  isLoading: boolean = true; // 只有在上面声明了 页面才能访问到
  constructor() { }

  ngOnInit() {
    setTimeout(() => {
      this.isLoading = false;
    }, 1000);
  }

}
