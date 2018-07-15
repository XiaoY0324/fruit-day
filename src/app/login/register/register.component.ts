import { Component, OnInit, ViewContainerRef } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { CaptchaService } from '../../shared/services/common.service';
import { ToastsManager } from 'ng2-toastr/ng2-toastr';

interface QueryParams {
  mobile: string,
  password: string,
  password_sec: string,
  verification_code: string,
}

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {
  queryParams: QueryParams = {
    mobile: '',
    password: '',
    password_sec: '',
    verification_code: '',
  };
  captchaSrc: String = `http://localhost:8989/aws/home/captcha`;


  constructor(private captchaService: CaptchaService, private http: HttpClient, private vRef: ViewContainerRef, private toastr: ToastsManager) {
    this.toastr.setRootViewContainerRef(vRef);
  }

  ngOnInit() {
    this.captchaService.getCaptcha();
  }

  refreshCaptcha () {
    this.captchaSrc = `http://localhost:8989/aws/home/captcha?img=` + Math.random();
  }

  submit(form) {
    let dirtyCheck = true;

    dirtyCheck = Object.keys(this.queryParams).some(key => !this.queryParams[key]);
    if (dirtyCheck) return this.toastr.error('请确认表单填写完整', '😣');

    if (this.queryParams.password_sec !== this.queryParams.password) return this.toastr.error('请确认两次密码填写一致', '失败');

    this.captchaService.register(this.queryParams).subscribe(data => {
      this.toastr.success(`注册成功`, '😊');
    }, err => {
      this.toastr.error(err.error.message, '😣');
    });

  }
}
