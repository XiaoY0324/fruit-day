import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { HomeComponent } from './page/home/home.component';
import { RegisterComponent } from './login/register/register.component';

const routes: Routes = [
  {
    path: 'register',
    component: RegisterComponent,
  },
  {
    path: 'home',
    component: HomeComponent,
    // children: [
    //   {
    //     path: 'living',
    //     component: MyLivingComponent,
    //   },
    //   {
    //     path: 'trip',
    //     component: MyTripComponent,
    //   },
    //   {
    //     path: 'experience',
    //     component: MyExperienceComponent,
    //   },
    //   {
    //     path: 'state',
    //     component: MyStateComponent,
    //   },
    //   {
    //     path: 'more',
    //     component: MoreComponent,
    //   },
    // ]
  },
  {
    path: '',
    redirectTo: '/register',
    pathMatch: 'full'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)], // 创建根路由
  exports: [RouterModule]
})
export class AppRoutingModule { }
