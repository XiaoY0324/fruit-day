import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { NgZorroAntdModule } from 'ng-zorro-antd';
import { AppComponent } from './app.component';
import { HeaderTabComponent } from './header-tab/header-tab.component';
import { InfoCardComponent } from './info-card/info-card.component';

import { AppRoutingModule } from './app-routing.module';
import { TabContentComponent } from './tab-content/tab-content.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderTabComponent,
    InfoCardComponent,
    TabContentComponent,
  ],
  imports: [
    AppRoutingModule,
    BrowserModule,
    FormsModule,
    HttpClientModule,
    BrowserAnimationsModule,
    NgZorroAntdModule.forRoot()
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
