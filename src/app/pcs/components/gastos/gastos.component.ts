import { Component, OnInit, inject } from '@angular/core';
import { FormArray, FormBuilder, Validators } from '@angular/forms';
import { MessageService } from 'primeng/api';
import { PcsService } from '../../services/pcs.service';
import { SharedService } from 'src/app/shared/services/shared.service';
import { gastosSecciones } from 'src/utils/constants';
import { obtenerMeses } from 'src/helpers/helpers';
import { DialogService } from 'primeng/dynamicdialog';
import { ModificarRubroComponent } from '../modificar-rubro/modificar-rubro.component';

@Component({
  selector: 'app-gastos',
  templateUrl: './gastos.component.html',
  styleUrls: ['./gastos.component.css'],
  providers: [MessageService, DialogService]
})
export class GastosComponent implements OnInit {

  dialogService     = inject(DialogService)
  fb                = inject(FormBuilder)
  messageService    = inject(MessageService)
  pcsService        = inject(PcsService)
  sharedService     = inject(SharedService)

  cargando:             boolean = true
  proyectoSeleccionado: boolean = false
  fechasPrueba:         any = obtenerMeses(new Date('2023-12-01'), new Date('2024-06-01'))

  constructor() { }
  
  form = this.fb.group({
    numProyecto:  [0, Validators.required],
    secciones:    this.fb.array([])
  })

  get secciones() {
    return this.form.get('secciones') as FormArray
  }
  
  rubros(seccionIndex: number) {
    return (this.secciones.at(seccionIndex).get('rubros') as FormArray)
  }

  ngOnInit(): void {
    
    this.pcsService.cambiarEstadoBotonNuevo(false)

    this.pcsService.obtenerIdProyecto()
      .subscribe(numProyecto => {
        this.proyectoSeleccionado = true
        if(numProyecto) {
          // this.sharedService.cambiarEstado(true)
          // this.cargando = true
          this.cargando = false
          this.cargarInformacion()
        } else {
          console.log('No hay proyecto');
        }
      })
  }

  cargarInformacion() {
    gastosSecciones.forEach((seccion, seccionIndex) => {
      
      this.secciones.push(this.fb.group({
        codigo:   [seccion.codigo],
        seccion:  [seccion.seccion],
        rubros:   this.fb.array([])
      }))

      seccion.rubros.forEach((rubro, rubroIndex) => {

        this.rubros(seccionIndex).push(this.fb.group({
          id:       [Date.now()],
          rubro:    [rubro],
          fechas:   this.fb.array([])
        }))
      })
    })
  }

  modificarRubro(rubro: {id: number, rubro: string, fechas: []}, seccionIndex: number, rubroIndex: number) {

    this.dialogService.open(ModificarRubroComponent, {
      header: rubro.rubro,
      width: '50%',
      contentStyle: {overflow: 'auto'},
      data: {
        rubro
      }
    })
    .onClose.subscribe((result) => {
      if(result && result.rubro) {
        console.log(result)
        // const empleadoRespuesta = result.empleado as Empleado
        // const fechasRespuesta = empleadoRespuesta.fechas.map(fechaRegistro => this.fb.group({
        //   id:         fechaRegistro.id,
        //   mes:        fechaRegistro.mes,
        //   anio:       fechaRegistro.anio,
        //   porcentaje: fechaRegistro.porcentaje
        // }))
        // if(empleado) {

        //   this.fechas(etapaIndex, empleadoIndex).clear()

        //   empleadoRespuesta.fechas.forEach(fechaRegistro => {
        //     this.fechas(etapaIndex, empleadoIndex).push(this.fb.group({
        //       id:         fechaRegistro.id,
        //       mes:        fechaRegistro.mes,
        //       anio:       fechaRegistro.anio,
        //       porcentaje: fechaRegistro.porcentaje
        //     }))
        //   })
        // } else {
        //   this.empleados(etapaIndex).push(this.fb.group({
        //     id:               empleadoRespuesta.id,
        //     idFase:           empleadoRespuesta.idFase,
        //     numempleadoRrHh:  empleadoRespuesta.numempleadoRrHh,
        //     empleado:         empleadoRespuesta.empleado,
        //     fechas:           this.fb.array(fechasRespuesta)
        //   }))
        // }
      }
    })
  }

}
