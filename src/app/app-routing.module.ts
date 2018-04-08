import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { InfoCardComponent } from './info-card/info-card.component'; // 名字要写对哦

const routes: Routes = [
  {
    path: 'left_menu',
    component: InfoCardComponent,
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)], // 创建根路由
  exports: [RouterModule]
})
export class AppRoutingModule { }
