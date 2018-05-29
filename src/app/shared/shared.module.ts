import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from './header/header.component';

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [HeaderComponent],
  exports: [HeaderComponent] // 导出组件 这样依赖了该模块的模块才能拿到该组件 注意 组件的使用是page-header(组件内部定义) 而不是<header-component></header-component>
})
export class SharedModule { }
