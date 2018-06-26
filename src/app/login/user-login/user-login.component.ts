import { Component, OnInit, ViewContainerRef } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { CaptchaService } from '../../shared/captcha/common.service';
import { ToastsManager } from 'ng2-toastr/ng2-toastr';
import { Router } from '@angular/router';

interface QueryParams {
  mobile: string,
  password: string
}

@Component({
  selector: 'app-user-login',
  templateUrl: './user-login.component.html',
  styleUrls: ['./user-login.component.scss']
})
export class UserLoginComponent implements OnInit {
  queryParams: QueryParams = {
    mobile: '',
    password: ''
  };
  captchaSrc: String = `http://localhost:8989/aws/home/captcha`;


  constructor(private captchaService: CaptchaService,
              private http: HttpClient,
              private vRef: ViewContainerRef,
              private toastr: ToastsManager,
              private router: Router) {
    this.toastr.setRootViewContainerRef(vRef);
  }

  ngOnInit() {
    this.captchaService.getCaptcha();
  }

  refreshCaptcha () {
    this.captchaSrc = `http://localhost:8989/aws/home/captcha?img=` + Math.random();
  }

  login(form) {
    this.captchaService.login(this.queryParams).subscribe((data:any) => {
      if (data && !data.code) {
        this.toastr.error('您还未注册', '请先注册');
        return false;
      } else {
        this.toastr.success('登陆成功', '😊');
        setTimeout(() => this.router.navigate(['/home']), 1000);

      }
    });
  }
}
