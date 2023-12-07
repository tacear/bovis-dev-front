import { Component, OnInit, inject } from '@angular/core';
import { MessageService } from 'primeng/api';
import { DialogService } from 'primeng/dynamicdialog';
import { finalize } from 'rxjs';
import { Cliente } from 'src/app/catalogos/Models/clientes';
import { ClientesService } from 'src/app/catalogos/services/clientes.service';
import { SharedService } from 'src/app/shared/services/shared.service';
import { TITLES } from 'src/utils/constants';
import { RegistroComponent } from '../registro/registro.component';

@Component({
  selector: 'app-principal',
  templateUrl: './principal.component.html',
  styleUrls: ['./principal.component.css'],
  providers: [MessageService, DialogService]
})
export class PrincipalComponent implements OnInit {

  clientesService   = inject(ClientesService)
  dialogService     = inject(DialogService)
  messageService    = inject(MessageService)
  sharedService     = inject(SharedService)

  clientes: Cliente[] = []

  constructor() { }

  ngOnInit(): void {
    
    this.sharedService.cambiarEstado(true)

    this.clientesService.obtenerClientes()
      .pipe(finalize(() => this.sharedService.cambiarEstado(false)))
      .subscribe({
        next: ({data}) => {
          this.clientes = data
        },
        error: (err) => this.messageService.add({severity: 'error', summary: TITLES.error, detail: err.error})
      })
  }

  guardarCliente(cliente: Cliente) {
    
    this.dialogService.open(RegistroComponent, {
      header: `${cliente ? 'Actualizar' : 'Agregar'} cliente`,
      width: '50%',
      contentStyle: {overflow: 'auto'},
      data: {
        cliente
      }
    })
    .onClose.subscribe((result) => {
      if(result && result.exito) {
        console.log('ok!');
      }
    })
  }

}
