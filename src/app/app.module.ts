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
import { MyLivingComponent } from './tab-content/tpls/my-living/my-living.component';
import { MyTripComponent } from './tab-content/tpls/my-trip/my-trip.component';
import { MyExperienceComponent } from './tab-content/tpls/my-experience/my-experience.component';
import { MyStateComponent } from './tab-content/tpls/my-state/my-state.component';
import { MoreComponent } from './tab-content/tpls/more/more.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderTabComponent,
    InfoCardComponent,
    TabContentComponent,
    MyLivingComponent,
    MyTripComponent,
    MyExperienceComponent,
    MyStateComponent,
    MoreComponent,
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
