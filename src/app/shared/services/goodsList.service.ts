import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Subject } from 'rxjs/Subject';
import { Observable } from 'rxjs';

@Injectable()
export class GoodsListService {
  private renderSubject: Subject<any> = new Subject<any>();

  public getRenderSubject(): Observable<any> {
    return this.renderSubject;
  }

  public emitRenderInfo(msg: any): void {
    if (msg) {
      this.renderSubject.next(msg);
    }
  }
}
