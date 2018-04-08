import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'tab-content',
  templateUrl: './tab-content.component.html',
  styleUrls: ['./tab-content.component.scss']
})
export class TabContentComponent implements OnInit {
  isLoading: boolean = true; // 只有在上面声明了 页面才能访问到

  constructor() { }

  ngOnInit() {
    setTimeout(() => {
      this.isLoading = false;
    }, 1000);
  }
}
