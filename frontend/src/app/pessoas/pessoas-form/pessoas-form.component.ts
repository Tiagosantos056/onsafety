import {Component, Inject, OnInit} from '@angular/core';
import {FormBuilder, FormControl, Validators} from "@angular/forms";
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
    nome: ['', [Validators.required, Validators.minLength(5), Validators.maxLength(150)]],
    cpf: ['', [Validators.required, Validators.minLength(11), Validators.maxLength(15)]],
    dataNascimento: ['', [Validators.required]],
    email: ['', [Validators.email, Validators.required]]
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

  getErrorMessage(fieldName: string){
    const field = this.form.get(fieldName);

    if (field?.hasError('required')){
      return 'Campo obrigatório.';
    }

    if (field?.hasError('minlength')){
      const requiredLength = field.errors ? field.errors['minlength']['requiredLength'] : 5;
      return `Tamanho mínimo precisa ser de ${requiredLength} caracteres.`;
    }

    if (field?.hasError('maxlength')){
      const requiredLength = field.errors ? field.errors['maxlength']['requiredLength'] : 200;
      return `Tamanho máximo precisa ser de ${requiredLength} caracteres.`;
    }
    return 'Campo inválido.'
  }

  getErrorCpf(fieldCpf: string){
    const field = this.form.get(fieldCpf);

    if (field?.hasError('required')){
      return 'Campo obrigatório.';
    }

    if (field?.hasError('minlength')){
      const requiredLength = field.errors ? field.errors['minlength']['requiredLength'] : 11;
      return `Tamanho mínimo precisa ser de ${requiredLength} caracteres.`;
    }

    if (field?.hasError('maxlength')){
      const requiredLength = field.errors ? field.errors['maxlength']['requiredLength'] : 15;
      return `Tamanho máximo precisa ser de ${requiredLength} caracteres.`;
    }
    return 'Campo inválido.'
  }
}
