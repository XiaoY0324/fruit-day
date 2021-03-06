import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

import { SharedModule } from '../shared/shared.module';
import { AppRoutingModule } from '../app-routing.module';

import { HomeComponent } from './home/home.component';
import { DetailComponent } from './detail/detail.component';
import { ShopCarComponent, PayModal } from './shop-car/shop-car.component';

@NgModule({
  imports: [
    NgbModule,
    FormsModule,
    CommonModule,
    AppRoutingModule
  ],
  declarations: [HomeComponent, DetailComponent, ShopCarComponent, PayModal],
  entryComponents: [PayModal]
})
export class PageModule { }
