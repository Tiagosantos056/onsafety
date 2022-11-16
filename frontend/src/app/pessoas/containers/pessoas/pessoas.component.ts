import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {Pessoa} from "../../model/pessoa";
import {PessoasService} from "../../services/pessoas.service";
import {catchError, Observable, of} from "rxjs";
import {MatDialog} from "@angular/material/dialog";
import {ErrorDialogComponent} from "../../../shared/components/error-dialog/error-dialog.component";
import {ActivatedRoute, Router} from "@angular/router";
import {MatSnackBar} from "@angular/material/snack-bar";
import {
  ConfirmationDialogComponent
} from "../../../shared/components/confirmation-dialog/confirmation-dialog.component";

@Component({
  selector: 'app-pessoas',
  templateUrl: './pessoas.component.html',
  styleUrls: ['./pessoas.component.scss']
})
export class PessoasComponent implements OnInit {

  pessoas$: Observable<Pessoa[]> | null = null;

  @Output() add = new EventEmitter(false);
  @Output() edit = new EventEmitter(false);
  @Output() deletar = new EventEmitter(true);

  constructor(
    private pessoasService: PessoasService,
    public dialog: MatDialog,
    private router: Router,
    private route: ActivatedRoute,
    private snackBar: MatSnackBar
    ) {

    this.refresh();
  }

  refresh() {
    this.pessoas$ = this.pessoasService.list()
      .pipe(
        catchError(error => {
          this.onError('Erro ao carregar lista de pessoas.');
          return of([])
        })
      );
  }

  onError(errorMessage: string) {
    this.dialog.open(ErrorDialogComponent, {
      data: errorMessage
    });
  }

  ngOnInit(): void { }

  onAdd() {
    this.router.navigate(['novo'], {relativeTo: this.route})
  }

  onEditar(pessoa: Pessoa) {
    this.router.navigate(['editar', pessoa._id], {relativeTo: this.route})
  }

  onDeletar(pessoa: Pessoa) {

    const dialogRef = this.dialog.open(ConfirmationDialogComponent, {
      data: 'Tem certeza que deseja deletar essa pessoa?',
    });

    dialogRef.afterClosed().subscribe((result: boolean) => {
      if (result) {
        this.pessoasService.remove(pessoa._id).subscribe(() => {
            this.refresh();
            this.snackBar.open('Pessoa deletado com sucesso!', 'X', {
              duration: 5000,
              verticalPosition: 'top',
              horizontalPosition: 'center'
            });
          },
          () => this.onError('Erro ao tentar deletar pessoa.'));
      }
    });
  }
}
