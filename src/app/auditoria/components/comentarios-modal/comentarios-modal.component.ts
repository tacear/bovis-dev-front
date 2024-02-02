import { Component, OnInit, inject } from '@angular/core';
import { MessageService } from 'primeng/api';
import { DynamicDialogConfig, DynamicDialogRef } from 'primeng/dynamicdialog';
import { SharedService } from 'src/app/shared/services/shared.service';
import { Opcion } from 'src/models/general.model';
import { AuditoriaService } from '../../services/auditoria.service';
import { finalize, forkJoin } from 'rxjs';
import { Comentario } from '../../models/auditoria.model';
import { FormBuilder, Validators } from '@angular/forms';
import { TITLES, errorsArray } from 'src/utils/constants';

@Component({
  selector: 'app-comentarios-modal',
  templateUrl: './comentarios-modal.component.html',
  styleUrls: ['./comentarios-modal.component.css'],
  providers: [MessageService]
})
export class ComentariosModalComponent implements OnInit {

  auditoriaService  = inject(AuditoriaService)
  config            = inject(DynamicDialogConfig)
  fb                = inject(FormBuilder)
  messageService    = inject(MessageService)
  ref               = inject(DynamicDialogRef)
  sharedService     = inject(SharedService)
  
  readOnly: boolean   = true
  numProyecto: number = null

  tiposComentario: Opcion[] = []
  comentarios: { [key: string]: Comentario[] } = {};
  form = this.fb.group({
    num_proyecto:       [null],
    comentario:         ['', Validators.required],
    id_tipo_comentario: ['', Validators.required]
  })

  constructor() { }

  ngOnInit(): void {
    if(this.config.data) {
      
      this.readOnly = this.config.data.readOnly
      this.numProyecto = this.config.data.numProyecto

      this.cargarInformacion()
    }
  }

  cargarInformacion() {

    this.sharedService.cambiarEstado(true)

    this.form.patchValue({ num_proyecto: this.numProyecto })

    forkJoin([
      this.auditoriaService.getTiposComentario(),
      this.auditoriaService.getComentarios(this.numProyecto)
    ])
    .pipe(finalize(() => this.sharedService.cambiarEstado(false)))
    .subscribe({
      next: (data) => {
        
        const [tiposComentariosR, comentariosR] = data

        this.tiposComentario = tiposComentariosR.data.map(tipo => {

          if (!this.comentarios[tipo.idTipoComentario]) {
            this.comentarios[tipo.idTipoComentario] = [];
          }
          
          return {
            code: tipo.idTipoComentario.toString(), 
            name: tipo.tipoComentario
          }
        })
        
        comentariosR.data.forEach(comentario => {
          this.comentarios[comentario.idTipoComentario].push(comentario)
        })
      },
      error: (err) => this.ref.close()
    })
  }

  guardar() {
    
    if(!this.form.valid) {
      this.form.markAllAsTouched()
      return
    }

    this.sharedService.cambiarEstado(true)

    this.auditoriaService.agregarComentario(this.form.value)
      .pipe(finalize(() => this.sharedService.cambiarEstado(false)))
      .subscribe({
        next: ({data}) => {
          this.messageService.add({severity: 'success', summary: TITLES.success, detail: 'El comentario ha sido agregado.'})
          this.comentarios[this.form.value.id_tipo_comentario].push({
            idComentario:     null,
            numProyecto:      this.form.value.num_proyecto,
            comentario:       this.form.value.comentario,
            fecha:            null,
            idTipoComentario: +this.form.value.id_tipo_comentario,
            tipoComentario:   ''
          })
          this.form.reset()
        },
        error: (err) => this.messageService.add({severity: 'error', summary: TITLES.error, detail: err.error})
      })

  }

  esInvalido(campo: string): boolean {
    return this.form.get(campo).invalid && 
            (this.form.get(campo).dirty || this.form.get(campo).touched)
  }

  obtenerMensajeError(campo: string): string {
    let mensaje = ''

    errorsArray.forEach((error) => {
      if(this.form.get(campo).hasError(error.tipo))
        mensaje = error.mensaje.toString()
    })

    return mensaje
  }

}
