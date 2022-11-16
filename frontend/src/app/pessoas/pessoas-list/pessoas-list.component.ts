import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {Pessoa} from "../model/pessoa";
import {ActivatedRoute, Router} from "@angular/router";

@Component({
  selector: 'app-pessoas-list',
  templateUrl: './pessoas-list.component.html',
  styleUrls: ['./pessoas-list.component.scss']
})
export class PessoasListComponent implements OnInit {

  @Input() pessoas: Pessoa[] = [];
  @Output() add = new EventEmitter(false);
  @Output() editar = new EventEmitter(false);
  @Output() deletar = new EventEmitter(true);

  readonly displayedColumns = ['nome', 'cpf', 'dataNascimento', 'email', 'actions'];

  constructor(private router: Router,
              private route: ActivatedRoute) { }

  ngOnInit(): void {
  }

  onAdd(){
    this.add.emit(true);
  }

  onEditar(pessoa: Pessoa){
    this.editar.emit(pessoa);
  }

  onDeletar(pessoa: Pessoa){
    this.deletar.emit(pessoa);
  }

}
