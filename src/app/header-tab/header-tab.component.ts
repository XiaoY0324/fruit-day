import { Component, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'header-tab-component',
  templateUrl: `./header-tab.component.html`,
  styleUrls: ['./header-tab.component.scss']
})
export class HeaderTabComponent {
  a: boolean = false;
  @Output() onSelectTab = new EventEmitter<any>();
  construtor () {

  }

  selectTab (label) {
    console.info(label);
    this.onSelectTab.emit(label);
  }
}
