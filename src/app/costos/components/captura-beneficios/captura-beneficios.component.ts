import { Component, OnInit, inject } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { MessageService } from 'primeng/api';
import { finalize } from 'rxjs';
import { EmpleadosService } from 'src/app/empleados/services/empleados.service';
import { SharedService } from 'src/app/shared/services/shared.service';
import { Opcion } from 'src/models/general.model';
import { TITLES, errorsArray } from 'src/utils/constants';

@Component({
  selector: 'app-captura-beneficios',
  templateUrl: './captura-beneficios.component.html',
  styleUrls: ['./captura-beneficios.component.css'],
  providers: [MessageService]
})
export class CapturaBeneficiosComponent implements OnInit {

  empleadosService  = inject(EmpleadosService)
  fb                = inject(FormBuilder)
  messageService    = inject(MessageService)
  sharedService     = inject(SharedService)

  constructor() { }

  form = this.fb.group({
    num_empleado:                 [null],
    vivienda:                     [0, Validators.required],
    automovil:                    [0, Validators.required],
    viaticos_a_comprobar:         [0, Validators.required],
    bono_adicional_reubicacion:   [0, Validators.required],
    gasolina:                     [0, Validators.required],
    casetas:                      [0, Validators.required],
    ayuda_de_transporte:          [0, Validators.required],
    vuelos_de_avion:              [0, Validators.required],
    provision_impuestos_expats:   [0, Validators.required],
    fringe_expats:                [0, Validators.required],
    programa_de_entretenimiento:  [0, Validators.required],
    eventos_especiales:           [0, Validators.required],
    otros:                        [0, Validators.required],
    costo_it:                     [0, Validators.required],
    costo_telefonia:              [0, Validators.required],
    sv_directivos:                [0, Validators.required],
    facturacion_bpm:              [0, Validators.required]
  })

  empleados: Opcion[] = []

  ngOnInit(): void {

    this.sharedService.cambiarEstado(true)

    this.empleadosService.getEmpleados()
      .pipe(finalize(() => this.sharedService.cambiarEstado(false)))
      .subscribe({
        next: ({data}) => {
          this.empleados = data.map(empleado => ({name: empleado.nombre_persona, code: empleado.nunum_empleado_rr_hh.toString()}))
        },
        error: (err) => this.messageService.add({severity: 'error', summary: TITLES.error, detail: err.error})
      })
  }

  guardar() {
    console.log(this.form.value);
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
