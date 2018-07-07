import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

import { HomeComponent } from './home/home.component';

@NgModule({
  imports: [
    NgbModule.forRoot(),
    CommonModule
  ],
  declarations: [HomeComponent]
})
export class PageModule { }
