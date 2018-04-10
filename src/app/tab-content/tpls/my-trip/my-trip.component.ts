import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-my-trip',
  templateUrl: './my-trip.component.html',
  styleUrls: ['./my-trip.component.scss']
})
export class MyTripComponent implements OnInit {
  showTime: boolean = true;
  constructor() { }

  ngOnInit() {
    setTimeout(() => {
      this.showTime = false;
    }, 2000);
  }

}
