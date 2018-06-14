 /*
 * Author: 杨帅 2018 up up~.
 * Email: amosyang@shunshunliuxue.com
 */

import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable()
export class CaptchaService {
  // private penddings = 0;

  constructor(private http: HttpClient) { }

  getCaptcha() {
    return this
      .http
      .get('http://localhost:8989/aws/home/captcha');
  }

}
