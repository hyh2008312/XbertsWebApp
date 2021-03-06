import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpModule }          from '@angular/http';

import { AppRoutingModule } from './app.routes.module';

import { AppComponent } from './app.component';

import {BaseApi} from './config/app.api';
import {SystemConstant, BlogCover} from './config/app.constant';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpModule
  ],
  providers: [BaseApi,SystemConstant, BlogCover],
  bootstrap: [AppComponent]
})
export class AppModule { }
