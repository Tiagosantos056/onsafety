import {Component, Inject, OnInit} from '@angular/core';
import {FormBuilder, FormControl} from "@angular/forms";
import {PessoasService} from "../services/pessoas.service";
import {MatSnackBar} from "@angular/material/snack-bar";
import {Location} from "@angular/common";
import {ActivatedRoute} from "@angular/router";
import {Pessoa} from "../model/pessoa";
import {DateAdapter} from "@angular/material/core";


@Component({
  selector: 'app-pessoas-form',
  templateUrl: './pessoas-form.component.html',
  styleUrls: ['./pessoas-form.component.scss']
})
export class PessoasFormComponent implements OnInit {

  form = this.formBuilder.group({
    _id: [''],
    nome: ['', this.validaNome],
    cpf: ['', this.validaCPF],
    dataNascimento: ['', this.validaDataNascimento],
    email: ['', this.validaEmail]
  });

  constructor(private formBuilder: FormBuilder,
              private service: PessoasService,
              private snackBar: MatSnackBar,
              private location: Location,
              private dateAdapter: DateAdapter<Date>,
              private route: ActivatedRoute) {
    this.dateAdapter.setLocale('pt-BR'); //dd/MM/yyyy

  }

  ngOnInit(): void {
    const pessoa: Pessoa = this.route.snapshot.data['pessoa'];
    this.form.setValue({
      _id: pessoa._id,
      nome: pessoa.nome,
      cpf: pessoa.cpf,
      dataNascimento: pessoa.dataNascimento,
      email: pessoa.email
    });
  }

  onSubmit() {
    this.service.save(<Pessoa>this.form.value)
      .subscribe(result => this.onSuccess(), error => {
        this.onError()
      });

  }

  onCancel() {
    this.location.back();
  }

  private onSuccess() {
    this.snackBar.open('Pessoa salva com sucesso!', '', {duration: 3000});
    this.onCancel();
  }

  private onError() {
    this.snackBar.open('Erro ao salvar pessoa.', '', {duration: 3000})
  }

  validaCPF(input: FormControl) {
    return (input.value ? null : {obrigatorio: true});
  }

  validaNome(input: FormControl){
    return (input.value ? null : {obrigatorio: 'O campo NOME é obrigatório!',});
  }

  validaDataNascimento(input: FormControl){
    return (input.value ? null : {obrigatorio: 'O campo DATA DE NASCIMENTO é obrigatório!',});
  }

  validaEmail(input: FormControl){
    return (input.value ? null : {obrigatorio: 'O campo E-MAIL é obrigatório!',});
  }


}
