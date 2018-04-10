import {Router, ActivatedRoute, Params} from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';

@Component({
  selector: 'app-left-menu',
  templateUrl: './info-card.component.html',
  styleUrls: ['./info-card.component.scss']
})

export class InfoCardComponent implements OnInit {
  nowLab: string = '生平';

  constructor(public Location: Location) { }

  ngOnInit() {
    const nowPath = this.Location.path();

    this.nowLab = nowPath.replace(/\/home\//, '');
  }

  onReceiveLabel (label) {
    console.info(`接收到子组件传递的label:` + label);
    this.nowLab = label;
  }
}
