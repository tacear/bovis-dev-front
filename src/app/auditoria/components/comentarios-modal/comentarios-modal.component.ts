import { Component, OnInit, inject } from '@angular/core';
import { MessageService,PrimeNGConfig } from 'primeng/api';
import { DynamicDialogConfig, DynamicDialogRef } from 'primeng/dynamicdialog';
import { SharedService } from 'src/app/shared/services/shared.service';
import { Opcion } from 'src/models/general.model';
import { AuditoriaService } from '../../services/auditoria.service';
import { finalize, forkJoin } from 'rxjs';
import { Comentario, FechaAuditoria } from '../../models/auditoria.model';
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
  FechaAuditoriaProx: { [key: string]: FechaAuditoria[] } = {};
  
  form = this.fb.group({
    num_proyecto:       [null],
    comentario:         ['', Validators.required],
    id_tipo_comentario: ['', Validators.required]
  })

  formFecha = this.fb.group({
    numProyecto:       [null],
    fechaAuditoria:         ['', Validators.required],
    
  })

  constructor(
    private configCalendar: PrimeNGConfig
  ) { }

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
    this.formFecha.patchValue({ numProyecto: this.numProyecto })


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

  guardarFechaAuditoria() {
    
    if(!this.formFecha.valid) {
      this.formFecha.markAllAsTouched()
      return
    }

    this.sharedService.cambiarEstado(true)

    this.auditoriaService.agregarFechaProxAuditoria(this.formFecha.value)
      .pipe(finalize(() => this.sharedService.cambiarEstado(false)))
      .subscribe({
        next: ({data}) => {
          this.messageService.add({severity: 'success', summary: TITLES.success, detail: 'La Proxima Fecha de Auditoria ha sido agregada.'})
          this.FechaAuditoriaProx[this.formFecha.value.fechaAuditoria].push({
            numProyecto:      this.formFecha.value.numProyecto,
            fechaAuditoria:            this.formFecha.value.fechaAuditoria
          })
          this.formFecha.reset()
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

  getConfigCalendar() {
    this.configCalendar.setTranslation({
      firstDayOfWeek: 1,
      dayNames: [
        'domingo',
        'lunes',
        'martes',
        'miércoles',
        'jueves',
        'viernes',
        'sábado',
      ],
      dayNamesShort: ['dom', 'lun', 'mar', 'mié', 'jue', 'vie', 'sáb'],
      dayNamesMin: ['D', 'L', 'M', 'X', 'J', 'V', 'S'],
      monthNames: [
        'Enero',
        'Febrero',
        'Marzo',
        'Abril',
        'Mayo',
        'Junio',
        'Julio',
        'Agosto',
        'Septiembre',
        'Octubre',
        'Noviembre',
        'Diciembre',
      ],
      monthNamesShort: [
        'ene',
        'feb',
        'mar',
        'abr',
        'may',
        'jun',
        'jul',
        'ago',
        'sep',
        'oct',
        'nov',
        'dic',
      ],
      today: 'Hoy',
      clear: 'Limpiar',
    });
  }

  esInvalidoFecha(campo: string): boolean {
    return this.formFecha.get(campo).invalid && 
            (this.formFecha.get(campo).dirty || this.formFecha.get(campo).touched)
  }

  obtenerMensajeErrorFecha(campo: string): string {
    let mensaje = ''

    errorsArray.forEach((error) => {
      if(this.formFecha.get(campo).hasError(error.tipo))
        mensaje = error.mensaje.toString()
    })

    return mensaje
  }

}
