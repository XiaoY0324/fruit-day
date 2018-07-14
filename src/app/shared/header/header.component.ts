import { Component, OnInit } from '@angular/core';
import { NgbTabsetModule, NgbTabChangeEvent } from '@ng-bootstrap/ng-bootstrap';
import { Router } from '@angular/router';
import { Location } from '@angular/common';

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

  constructor(public ngbTabset: NgbTabsetModule, private router: Router, public location: Location) { }

  ngOnInit() {
    console.warn(this.location.path());
    const curPath = this.location.path();
    this.user = localStorage.getItem('user') ? JSON.parse(localStorage.getItem('user')) : { uid: '' };

    if (/\/shop_car/.test(curPath)) this.showTab = false;
  }

  beforeChange($event: NgbTabChangeEvent) {
    // for (let item in this.mapLinkObj) {

    // }
    this.router.navigate([this.mapLinkObj[$event.nextId]]);
  }
}
