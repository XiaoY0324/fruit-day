import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-left-menu',
  templateUrl: './info-card.component.html',
  styleUrls: ['./info-card.component.scss']
})
export class InfoCardComponent implements OnInit {
  nowLab: string = '生平';

  constructor() { }

  ngOnInit() {

  }

  onReceiveLabel (label) {
    console.info(`接收到子组件传递的label:` + label);
    this.nowLab = label;
  }
}
