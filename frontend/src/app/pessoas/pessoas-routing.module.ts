import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {PessoasComponent} from "./containers/pessoas/pessoas.component";
import {PessoasFormComponent} from "./pessoas-form/pessoas-form.component";
import {PessoaResolver} from "./guards/pessoa.resolver";
import {PessoasListComponent} from "./pessoas-list/pessoas-list.component";
import {CommonModule} from "@angular/common";

const routes: Routes = [
  { path: '', component: PessoasComponent },
  { path: 'novo', component: PessoasFormComponent, resolve: {pessoa: PessoaResolver} },
  { path: 'editar/:id', component: PessoasFormComponent, resolve: {pessoa: PessoaResolver} },
  { path: 'deletar/:id', component: PessoasListComponent, resolve: {pessoa: PessoaResolver} }
];

@NgModule({
  imports: [CommonModule,
    RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PessoasRoutingModule { }
