import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

import { HomeComponent, NgbdModalContent } from './home/home.component';
import { DetailComponent } from './detail/detail.component';
import { AppRoutingModule } from '../app-routing.module';


@NgModule({
  imports: [
    NgbModule,
    FormsModule,
    CommonModule,
    AppRoutingModule
  ],
  declarations: [HomeComponent, DetailComponent, NgbdModalContent],
  entryComponents: [NgbdModalContent]
})
export class PageModule { }
