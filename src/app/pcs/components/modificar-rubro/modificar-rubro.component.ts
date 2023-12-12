import { Component, OnInit, inject } from '@angular/core';
import { FormArray, FormBuilder } from '@angular/forms';
import { MessageService, PrimeNGConfig } from 'primeng/api';
import { DynamicDialogConfig, DynamicDialogRef } from 'primeng/dynamicdialog';
import { SharedService } from 'src/app/shared/services/shared.service';
import { PcsService } from '../../services/pcs.service';
import { errorsArray } from 'src/utils/constants';
import { obtenerMeses } from 'src/helpers/helpers';

@Component({
  selector: 'app-modificar-rubro',
  templateUrl: './modificar-rubro.component.html',
  styleUrls: ['./modificar-rubro.component.css'],
  providers: [MessageService]
})
export class ModificarRubroComponent implements OnInit {

  ref               = inject(DynamicDialogRef)
  config            = inject(DynamicDialogConfig)
  primeConfig       = inject(PrimeNGConfig)
  messageService    = inject(MessageService)
  sharedService     = inject(SharedService)
  pcsService        = inject(PcsService)
  fb                = inject(FormBuilder)


  form = this.fb.group({
    unidad:       [null],
    cantidad:     [null],
    reembolsable: [false],
    aplica:       [false],
    fechas:       this.fb.array([])
  })

  constructor() { }
  
  get fechas() {
    return this.form.get('fechas') as FormArray
  }

  ngOnInit(): void {

    const fechaInicio     = new Date('2023-12-01')
    const fechaFin        = new Date('2024-06-01')

    obtenerMeses(fechaInicio, fechaFin).forEach(mesRegistro => {

      this.fechas.push(this.fb.group({
        mes:        [mesRegistro.mes],
        anio:       [mesRegistro.anio],
        desc:       [mesRegistro.desc],
        porcentaje: [0]
      }))
    })
  }

  guardar() {

  }

  cambiarValoresFechas() {
    this.fechas.controls.forEach((fecha, index) => {
      this.fechas.at(index).patchValue({
        porcentaje: this.form.value.aplica ? this.form.value.cantidad : 0
      })
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
  
  closeDialog() {
    this.ref.close(null)
  }

}
