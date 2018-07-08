import { Component, OnInit } from '@angular/core';
import { NgbTabsetModule, NgbTabChangeEvent } from '@ng-bootstrap/ng-bootstrap';
import { Router } from '@angular/router';

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

  constructor(public ngbTabset: NgbTabsetModule, private router: Router) { }

  ngOnInit() {
  }

  beforeChange($event: NgbTabChangeEvent) {
    // for (let item in this.mapLinkObj) {

    // }
    this.router.navigate([this.mapLinkObj[$event.nextId]]);
  }
}
