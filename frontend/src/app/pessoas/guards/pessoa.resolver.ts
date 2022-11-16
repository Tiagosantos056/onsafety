import {Injectable} from '@angular/core';
import {ActivatedRouteSnapshot, Resolve, RouterStateSnapshot} from '@angular/router';
import {Observable, of} from 'rxjs';
import {PessoasService} from "../services/pessoas.service";
import {Pessoa} from "../model/pessoa";

@Injectable({
  providedIn: 'root'
})
export class PessoaResolver implements Resolve<Pessoa> {

  constructor(private service: PessoasService) { }

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<Pessoa> {

    if (route.params && route.params['id']){
      return this.service.loadById(route.params['id']);
    }
    return of({_id: '', nome: '', cpf: '', dataNascimento: null , email: ''});
  }
}
