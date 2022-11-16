import {CommonModule, registerLocaleData} from '@angular/common';

import {PessoasRoutingModule} from './pessoas-routing.module';
import {PessoasComponent} from './containers/pessoas/pessoas.component';
import {AppMaterialModule} from "../shared/app-material/app-material.module";
import {SharedModule} from "../shared/shared.module";
import {PessoasFormComponent} from './pessoas-form/pessoas-form.component';
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {PessoasListComponent} from './pessoas-list/pessoas-list.component';
import {ValidaCpfPipe} from "./pessoas-form/validaCpf.pipe";

import {LOCALE_ID, NgModule} from '@angular/core';
import ptBr from '@angular/common/locales/pt';
import {NgxMaskModule} from "ngx-mask";
import {MaskDateDirective} from "../shared/Mask-date-directive.directive";
import {DateAdapter, MAT_DATE_FORMATS, MAT_DATE_LOCALE} from "@angular/material/core";
import {MomentDateAdapter} from "@angular/material-moment-adapter";

registerLocaleData(ptBr)

const MY_DATE_FORMAT = {
  parse: {
    dateInput: 'DD/MM/YYYY', // this is how your date will be parsed from Input
  },
  display: {
    dateInput: 'DD/MM/YYYY', // this is how your date will get displayed on the Input
    monthYearLabel: 'MMMM YYYY',
    dateA11yLabel: 'LL',
    monthYearA11yLabel: 'MMMM YYYY'
  }
};

@NgModule({
  declarations: [
    PessoasComponent,
    PessoasFormComponent,
    PessoasListComponent,
    ValidaCpfPipe,
    MaskDateDirective
  ],
  imports: [
    CommonModule,
    PessoasRoutingModule,
    AppMaterialModule,
    SharedModule,
    ReactiveFormsModule,
    FormsModule,
    NgxMaskModule,
  ],
  providers: [
    {
      provide: LOCALE_ID,
      useValue: 'pt-BR'
    },
    {
      provide: MAT_DATE_LOCALE,
      useValue: 'pt-BR'
    },
    { provide: DateAdapter, useClass: MomentDateAdapter, deps: [MAT_DATE_LOCALE] },
    { provide: MAT_DATE_FORMATS, useValue: MY_DATE_FORMAT }
  ],
  bootstrap: []
})
export class PessoasModule {
}
