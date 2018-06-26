 /*
 * Author: 杨帅 2018 up up~.
 * Email: amosyang@shunshunliuxue.com
 */

import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable()
export class CaptchaService {
  // private penddings = 0
  constructor(private http: HttpClient) { }

  // 获取二维码
  getCaptcha() {
    return this
      .http
      .get(`http://localhost:8989/aws/home/captcha`, {
        withCredentials: true
      });
  }

  // 注册
  register(data) {
    let headers = new HttpHeaders();
    return this
      .http
      .post(`http://localhost:8989/aws/home/register`, data, {
        withCredentials: true
      });
  }

  // 登录
  login(data) {
    let headers = new HttpHeaders();
    headers.append('Api-User-Agent', 'Example/1.0');

    return this
      .http
      .post(`http://localhost:8989/aws/home/user_login`, data, {
        withCredentials: true
      });
  }
}
