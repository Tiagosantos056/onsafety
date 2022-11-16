import {LOCALE_ID, NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';

import {MatToolbarModule} from '@angular/material/toolbar';
import {MatListModule} from "@angular/material/list";
import {HttpClientModule} from "@angular/common/http";

import {registerLocaleData} from '@angular/common';
import pt from '@angular/common/locales/pt';
import {FormsModule} from "@angular/forms";
import {AppMaterialModule} from "./shared/app-material/app-material.module";
import {MAT_DATE_LOCALE} from "@angular/material/core";

registerLocaleData(pt)

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatToolbarModule,
    MatListModule,
    HttpClientModule,
    FormsModule,
    AppMaterialModule,
    FormsModule,
  ],
  providers: [
    {
      provide: LOCALE_ID,
      useValue: 'pt-BR'
    },
    {
      provide: MAT_DATE_LOCALE,
      useValue: 'pt-BR'
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}
