import { Component, OnInit } from '@angular/core';

interface QueryParams {
  mobile: string,
  password: string,
  password_sec: string,
  verification_code: string,
  message_code: string
}

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {
  queryParams: QueryParams = {};

  constructor() { }

  ngOnInit() {
  }

  submit(form) {
    console.log(this.queryParams);
    console.log(form);
  }

}
