import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { ChartsModule } from 'ng2-charts'; // 默认读取xxx.d.ts

import { AppComponent } from './app.component';

import { PageModule } from './page/page.module';
import { LoginModule } from './login/login.module';
import { SharedModule } from './shared/shared.module';

@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    AppRoutingModule,
    BrowserModule,
    FormsModule,
    HttpClientModule,
    BrowserAnimationsModule,
    ChartsModule,

    SharedModule,
    PageModule,
    LoginModule,
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
