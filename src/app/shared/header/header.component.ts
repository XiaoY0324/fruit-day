import { Component, OnInit, ViewChild, ViewContainerRef } from '@angular/core';
import { NgbTabsetModule, NgbTabChangeEvent } from '@ng-bootstrap/ng-bootstrap';
import { Router } from '@angular/router';
import { Location } from '@angular/common';

import { GoodsListService } from '../services/goodsList.service';

@Component({
  selector: 'page-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  mapLinkObj: object= {
    'ngb-tab-0': '/home',
    'ngb-tab-1': '/login'
  };
  showTab: boolean = true;
  user: any;
  filterLabel: string;
  @ViewChild("t") tabSet;

  constructor(public ngbTabset: NgbTabsetModule, private router: Router, public location: Location, private goodsListService: GoodsListService) { }

  ngOnInit() {
    const curPath = this.location.path();

    this.user = localStorage.getItem('user') ? JSON.parse(localStorage.getItem('user')) : { uid: '' };
    if (/\/shop_car/.test(curPath)) this.showTab = false;
  }

  ngAfterViewInit() {
    console.warn(this.location.path(), this.tabSet);
    let nowTabId = '';

    for (let key in this.mapLinkObj) {
      if (this.mapLinkObj[key] === this.location.path()) nowTabId = key;
    }
    this.tabSet.select(nowTabId);
  }

  beforeChange($event: NgbTabChangeEvent) {
    this.router.navigate([this.mapLinkObj[$event.nextId]]);
  }

  filterList(filterLabel) {
    console.log(filterLabel);
    this.goodsListService.emitRenderInfo(filterLabel);
  }
}
