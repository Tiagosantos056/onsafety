import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {ErrorDialogComponent} from './components/error-dialog/error-dialog.component';
import {AppMaterialModule} from "./app-material/app-material.module";
import {MatButtonModule} from "@angular/material/button";
import {IConfig, NgxMaskModule} from "ngx-mask";
import { ConfirmationDialogComponent } from './components/confirmation-dialog/confirmation-dialog.component';

const maskConfig: Partial<IConfig> = {
  validation: false,
};

@NgModule({
  declarations: [
    ErrorDialogComponent,
    ConfirmationDialogComponent,
  ],
  imports: [
    CommonModule,
    AppMaterialModule,
    MatButtonModule,
    NgxMaskModule.forRoot(maskConfig)
  ],
  exports: [
    ErrorDialogComponent,
    ConfirmationDialogComponent
  ],
  providers: []
})
export class SharedModule { }
