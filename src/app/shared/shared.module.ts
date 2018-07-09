import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from './header/header.component';
import { CaptchaService } from './captcha/common.service';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { AppRoutingModule } from '../app-routing.module';
import { AddCartComponent } from './add-cart/add-cart.component';

@NgModule({
  imports: [
    CommonModule,
    NgbModule,
    AppRoutingModule
  ],
  declarations: [HeaderComponent, AddCartComponent],
  providers: [CaptchaService],
  entryComponents: [AddCartComponent], // 在公共模块设置入口组件
  exports: [HeaderComponent, AddCartComponent] // 导出组件 这样依赖了该模块的模块才能拿到该组件 注意 组件的使用是page-header(组件内部定义) 而不是<header-component></header-component>
})
export class SharedModule { }
