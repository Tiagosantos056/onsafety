import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {CommonModule} from "@angular/common";

const routes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: 'pessoas' },
  {
    path: 'pessoas', loadChildren: () => import('./pessoas/pessoas.module').then(m => m.PessoasModule)
  }
];

@NgModule({
  imports: [CommonModule, RouterModule.forRoot(routes),],
  exports: [RouterModule]
})
export class AppRoutingModule { }
