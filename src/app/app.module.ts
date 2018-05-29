import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
// import { NgZorroAntdModule } from 'ng-zorro-antd';
import { AppRoutingModule } from './app-routing.module';
import { ChartsModule } from 'ng2-charts'; // 默认读取xxx.d.ts

import { AppComponent } from './app.component';
// import { HeaderComponent } from './shared/header/header.component';

import { PageModule } from './page/page.module';
import { LoginModule } from './login/login.module';
import { SharedModule } from './shared/shared.module';

@NgModule({
  declarations: [
    AppComponent,
    // HeaderComponent
  ],
  imports: [
    AppRoutingModule,
    BrowserModule,
    FormsModule,
    HttpClientModule,
    BrowserAnimationsModule,
    // NgZorroAntdModule.forRoot(),
    ChartsModule,

    SharedModule,
    PageModule,
    LoginModule,
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
