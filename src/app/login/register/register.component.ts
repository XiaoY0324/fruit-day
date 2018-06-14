import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { CaptchaService } from '../../shared/captcha/captcha.service';

interface QueryParams {
  mobile?: string,
  password?: string,
  password_sec?: string,
  verification_code?: string,
  message_code?: string
}

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {
  queryParams: QueryParams = {};
  captchaSrc: String = `http://localhost:8989/aws/home/captcha`;


  constructor(private captchaService: CaptchaService, private http: HttpClient) { }

  ngOnInit() {
    this.captchaService.getCaptcha();
  }

  refreshCaptcha () {
    this.captchaSrc = `http://localhost:8989/aws/home/captcha?img=` + Math.random();
  }

  submit(form) {
    console.log(this.queryParams);
    console.log(form);
    // this.captchaService.getCaptcha().subscribe(data => {
    //     console.log(data);
    //   });;
    // this
    //   .http
    //   .get('http://localhost:8989/aws/home/captcha').subscribe(data => {
    //     console.log(data);
    //   });
  }

}
