import {Injectable} from '@angular/core';
import {Pessoa} from "../model/pessoa";
import {HttpClient} from "@angular/common/http";
import {first, tap} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class PessoasService {

  private readonly API = 'api/pessoas/';

  //INSTANCIA DA CLASSE HttpClient PARA COMUNICACAO/REQUISICOES COM A API
  constructor(private httpClient: HttpClient) { }

  list() {
    return this.httpClient.get<Pessoa[]>(this.API)
      .pipe(
        first(),
        tap(pessoas => console.log())
    );
  }

  loadById(id: string){
    return this.httpClient.get<Pessoa>(`${this.API}/${id}`);
  }

  save(record: Partial<Pessoa>){

    if (record._id){
      return this.update(record);
    }
    return this.create(record);
  }

  private create(record: Partial<Pessoa>){
    return this.httpClient.post<Pessoa>(this.API, record)
      .pipe(
        first()
      );
  }

  private update(record: Partial<Pessoa>){
    return this.httpClient.put<Pessoa>(`${this.API}/${record._id}`, record)
      .pipe(
        first()
      );
  }


  remove(id: string){
    return this.httpClient.delete(`${this.API}/${id}`)
      .pipe(
        first()
      );
  }

}
