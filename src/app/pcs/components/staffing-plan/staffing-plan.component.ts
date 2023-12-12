import { Component, OnInit, inject } from '@angular/core';
import { FormBuilder, FormArray, Validators } from '@angular/forms';
import { DialogService } from 'primeng/dynamicdialog';
import { SeleccionarEmpleadoComponent } from '../seleccionar-empleado/seleccionar-empleado.component';
import { SeleccionarFechaComponent } from '../seleccionar-fecha/seleccionar-fecha.component';
import { PcsService } from '../../services/pcs.service';
import { SharedService } from 'src/app/shared/services/shared.service';
import { finalize } from 'rxjs';
import { MessageService } from 'primeng/api';
import { TITLES } from 'src/utils/constants';
import { Empleado, Etapa, EtapasPorProyectoData } from '../../models/pcs.model';
import { format } from 'date-fns';
import { es } from 'date-fns/locale';
import { CrearEtapaComponent } from '../crear-etapa/crear-etapa.component';
import { ModificarEmpleadoComponent } from '../modificar-empleado/modificar-empleado.component';
import { Mes } from 'src/models/general.model';
import { obtenerMeses } from 'src/helpers/helpers';

// interface Etapa {
//   id:         number,
//   nombre:     string,
//   totalMeses: number,
//   meses:      boolean[],
// }

// interface Empleado {
//   id:         number,
//   cod:        string,
//   nombre:     string,
//   posicion:   string,
//   totalMeses: number,
//   meses:      number[]
// }

@Component({
  selector: 'app-staffing-plan',
  templateUrl: './staffing-plan.component.html',
  styleUrls: ['./staffing-plan.component.css'],
  providers: [DialogService, MessageService]
})
export class StaffingPlanComponent implements OnInit {

  dialogService     = inject(DialogService)
  fb                = inject(FormBuilder)
  messageService    = inject(MessageService)
  pcsService        = inject(PcsService)
  sharedService     = inject(SharedService)

  proyectoFechaInicio:  Date
  proyectoFechaFin:     Date

  cargando:             boolean = true
  proyectoSeleccionado: boolean = false

  constructor() {}

  form = this.fb.group({
    numProyecto:  [0, Validators.required],
    etapas:       this.fb.array([])
  })

  get etapas() {
    return this.form.get('etapas') as FormArray
  }
  
  empleados(etapaIndex: number) {
    return (this.etapas.at(etapaIndex).get('empleados') as FormArray)
  }
  
  fechas(etapaIndex: number, empleadoIndex: number) {
    return (this.empleados(etapaIndex).at(empleadoIndex).get('fechas') as FormArray)
  }

  ngOnInit(): void {
    
    this.pcsService.cambiarEstadoBotonNuevo(false)

    this.pcsService.obtenerIdProyecto()
      .subscribe(numProyecto => {
        this.proyectoSeleccionado = true
        this.form.reset()
        this.etapas.clear()
        if(numProyecto) {
          // this.sharedService.cambiarEstado(true)
          this.cargando = true
          this.pcsService.obtenerEtapasPorProyecto(numProyecto)
            .pipe(finalize(() => {
              // this.sharedService.cambiarEstado(false)
              this.cargando = false
            }))
            .subscribe({
              next: ({data}) => this.cargarInformacion(data),
              error: (err) => this.messageService.add({severity: 'error', summary: TITLES.error, detail: err.error})
            })
        } else {
          console.log('No hay proyecto');
        }
      })
  }

  cargarInformacion(data: EtapasPorProyectoData) {

    this.form.patchValue({numProyecto: data.numProyecto})
    this.proyectoFechaInicio  = new Date(data.fechaIni)
    this.proyectoFechaFin     = new Date(data.fechaFin)

    // Agregamos las etapas del proyecto
    data.etapas.forEach((etapa, etapaIndex) => {

      this.etapas.push(this.fb.group({
        idFase:       etapa.idFase,
        orden:        etapa.orden,
        fase:         etapa.fase,
        fechaIni:     etapa.fechaIni,
        fechaFin:     etapa.fechaFin,
        empleados:    this.fb.array([]),
        meses:        this.fb.array(obtenerMeses(new Date(etapa.fechaIni), new Date(etapa.fechaFin)))
      }))

      // Agregamos los empleados por cada etapa
      etapa.empleados.forEach((empleado, empleadoIndex) => {

        this.empleados(etapaIndex).push(this.fb.group({
          id:               empleado.id,
          idFase:           empleado.idFase,
          numempleadoRrHh:  empleado.numempleadoRrHh,
          empleado:         empleado.empleado,
          fechas:           this.fb.array([])
        }))

        // Agreamos las fechas por empleado
        empleado.fechas.forEach(fecha => {

          this.fechas(etapaIndex, empleadoIndex).push(this.fb.group({
            id:         fecha.id,
            mes:        fecha.mes,
            anio:       fecha.anio,
            porcentaje: fecha.porcentaje
          }))
        })
      })
    })
  }

  agregarEtapa() {

    this.dialogService.open(CrearEtapaComponent, {
      header: 'Crear etapa',
      width: '50%',
      contentStyle: {overflow: 'auto'},
      data: {
        numProyecto:  this.form.value.numProyecto,
        fechaInicio:  this.proyectoFechaInicio,
        fechaFin:     this.proyectoFechaFin
      }
    })
    .onClose.subscribe((result) => {
      if(result && result.etapa) {
        const etapa = result.etapa
        this.etapas.push(this.fb.group({
          idFase:       etapa.idFase,
          orden:        etapa.orden,
          fase:         etapa.fase,
          fechaIni:     etapa.fechaIni,
          fechaFin:     etapa.fechaFin,
          empleados:    this.fb.array([]),
          meses:        this.fb.array(obtenerMeses(new Date(etapa.fechaIni), new Date(etapa.fechaFin)))
        }))
      }
    })
  }

  eliminarEtapa(event: Event, etapa: Etapa, index: number) {
    
    event.stopPropagation()

    this.sharedService.cambiarEstado(true)

    this.pcsService.eliminarEtapa(etapa.idFase)
      .pipe(finalize(() => this.sharedService.cambiarEstado(false)))
      .subscribe({
        next: (data) => {
          this.etapas.removeAt(index)
          this.messageService.add({severity: 'success', summary: TITLES.success, detail: 'La etapa ha sido eliminada.'})
        }, 
        error: (err) => this.messageService.add({severity: 'error', summary: TITLES.error, detail: err.error})
      })
  }

  modificarEmpleado(event: Event, etapa: Etapa, empleado: Empleado | null, etapaIndex: number, empleadoIndex: number | null) {
    event.stopPropagation()

    this.dialogService.open(ModificarEmpleadoComponent, {
      header: 'Empleado (Porcentajes)',
      width: '50%',
      contentStyle: {overflow: 'auto'},
      data: {
        etapa,
        empleado
      }
    })
    .onClose.subscribe((result) => {
      if(result && result.empleado) {
        const empleadoRespuesta = result.empleado as Empleado
        const fechasRespuesta = empleadoRespuesta.fechas.map(fechaRegistro => this.fb.group({
          id:         fechaRegistro.id,
          mes:        fechaRegistro.mes,
          anio:       fechaRegistro.anio,
          porcentaje: fechaRegistro.porcentaje
        }))
        if(empleado) {

          this.fechas(etapaIndex, empleadoIndex).clear()

          empleadoRespuesta.fechas.forEach(fechaRegistro => {
            this.fechas(etapaIndex, empleadoIndex).push(this.fb.group({
              id:         fechaRegistro.id,
              mes:        fechaRegistro.mes,
              anio:       fechaRegistro.anio,
              porcentaje: fechaRegistro.porcentaje
            }))
          })
        } else {
          this.empleados(etapaIndex).push(this.fb.group({
            id:               empleadoRespuesta.id,
            idFase:           empleadoRespuesta.idFase,
            numempleadoRrHh:  empleadoRespuesta.numempleadoRrHh,
            empleado:         empleadoRespuesta.empleado,
            fechas:           this.fb.array(fechasRespuesta)
          }))
        }
      }
    })
  }

  eliminarEmpleado(event: Event, etapa: Etapa, empleado: Empleado, etapaIndex: number, empleadoIndex: number) {
    
    event.stopPropagation()

    this.sharedService.cambiarEstado(true)

    this.pcsService.eliminarEmpleado(empleado.numempleadoRrHh, etapa.idFase)
      .pipe(finalize(() => this.sharedService.cambiarEstado(false)))
      .subscribe({
        next: (data) => {
          this.empleados(etapaIndex).removeAt(empleadoIndex)
          this.messageService.add({severity: 'success', summary: TITLES.success, detail: 'La etapa ha sido eliminada.'})
        }, 
        error: (err) => this.messageService.add({severity: 'error', summary: TITLES.error, detail: err.error})
      })
  }

  /**
   * Funciones auxiliares
   */

  obtenerNombreFase(etapa: Etapa) {
    return `${etapa.fase} (${format(new Date(etapa.fechaIni), 'LLL/Y', {locale: es})} - ${format(new Date(etapa.fechaFin), 'LLL/Y', {locale: es})})`
  }

  obtenerFechas(etapa: Etapa) {
    return [format(new Date(etapa.fechaIni), 'Y-m-d'), format(new Date(etapa.fechaFin), 'Y-m-d')]
  }

  abre() {
    console.log('hola');
  }








  // meses: String[] = ['06-23', '07-23', '08-23', '09-23', '10-23', '11-23', '12-23', '01-24']

  // /**
  //  * Etapas
  //  */
  // etapaForm = this.fb.group({
  //   etapa: ['', Validators.required]
  // });

  // etapas: Etapa[] = []

  // empleados: Empleado[] = []

  // get jsonEtapas(): string {
  //   return JSON.stringify(this.etapas, null, 3)
  // }

  // get duracionMeses(): number {
  //   let total = 0
  //   this.etapasCampos.controls.map(element => {
  //     total += element.value.totalMeses
  //   })
  //   return total
  //   // this.etapasCampos.map(etapa => {
  //   //   total += etapa.totalMeses
  //   // })
  //   // return total
  // }

  // form = this.fb.group({
  //   empleadosCampos: this.fb.array([])
  // });

  // formEtapas = this.fb.group({
  //   etapasCampos: this.fb.array([])
  // })

  // get empleadosCampos() {
  //   return this.form.controls["empleadosCampos"] as FormArray;
  // }

  // get etapasCampos() {
  //   return this.formEtapas.controls['etapasCampos'] as FormArray
  // }

  // agregarEmpleado() {
  //   this.dialogService.open(SeleccionarEmpleadoComponent, {
  //     header: 'Seleccionar empleado',
  //     width: '50%',
  //     height: '450px',
  //     contentStyle: {overflow: 'auto'}
  //   })
  //   .onClose.subscribe(data => {
  //     if(data) {
  //       const mesesCampos = this.meses.map((mes, index) => {
  //         return [0]
  //       })
  //       const empleadoForm = this.fb.group({
  //         cod:        [data.empleado.nunum_empleado_rr_hh],
  //         nombre:     [data.empleado.nombre_persona],
  //         posicion:   [data.empleado.chpuesto],
  //         totalMeses: [0],
  //         ...mesesCampos
  //       })
  //       this.empleadosCampos.push(empleadoForm);
  //       this.empleados.push({
  //         id:         Date.now(),
  //         cod:        empleadoForm.value.cod,
  //         nombre:     empleadoForm.value.nombre,
  //         posicion:   empleadoForm.value.posicion,
  //         totalMeses: 0,
  //         meses:      []
  //       })
  //     }
  //   })
  // }

  // sumarTotal(i: number, iMes: number, {target}: any) {
  //   let total = 0
  //   this.meses.map((mes, index) => {
  //     this.empleados[i].meses[index] = (this.empleadosCampos.value[i][index] / 100)
  //     total += this.empleadosCampos.value[i][index]
  //   })
  //   this.empleados[i].totalMeses = (total / 100)
  // }

  // toggleOpcion(id: number, idMes: number) {
  //   // etapa.meses[indice] = !etapa.meses[indice]
  //   // etapa.totalMeses = etapa.meses.filter(valor => valor).length
  //   const etapa = this.etapasCampos.value[id]
  //   const valor = etapa[idMes]
  //   const totalMeses = valor ? etapa.totalMeses + 1 : etapa.totalMeses - 1
  //   this.etapasCampos.at(id).patchValue({
  //     totalMeses
  //   })
  // }

  // agregarEtapa() {
    
  //   const mesesCampos = this.meses.map((mes, index) => {
  //     return [false]
  //   })

  //   const sEtapaForm = this.fb.group({
  //     id: Date.now(),
  //     nombre: this.etapaForm.value.etapa,
  //     totalMeses: 0,
  //     ...mesesCampos
  //   })
  //   this.etapasCampos.push(sEtapaForm)

  //   this.etapaForm.reset()
  // }

  // borrarEtapa(id: number) {
  //   // this.etapas = this.etapas.filter(({id}) => id !== etapa.id)
  //   this.etapasCampos.removeAt(id)
  // }

  // marcarPorFecha(id: number) {
  //   this.dialogService.open(SeleccionarFechaComponent, {
  //     header: 'Seleccionar Fecha',
  //     width: '50%',
  //     height: '450px',
  //     contentStyle: {overflow: 'auto'}
  //   })
  //   .onClose.subscribe(data => {
  //     if(data) {
  //       const [fechaInicio, fechaFin] = data

  //       if(fechaInicio && !fechaFin) {
  //         const indexMesInicio = this.meses.findIndex(mes => mes === fechaInicio)
  //         if(indexMesInicio >= 0) {
  //           for (let index = indexMesInicio; index < this.meses.length; index++) {
  //             const patchObject: any = {};
  //             patchObject[index] = true;
  //             this.etapasCampos.at(id).patchValue(patchObject)
  //           }
  //         }
  //       }

  //       if(fechaInicio && fechaFin) {
  //         const indexMesInicio = this.meses.findIndex(mes => mes === fechaInicio)
  //         const indexMesFin = this.meses.findIndex(mes => mes === fechaFin)

  //         if(indexMesInicio >= 0 && indexMesFin >= 0) {
  //           for (let index = indexMesInicio; index <= indexMesFin; index++) {
  //             const patchObject: any = {};
  //             patchObject[index] = true;
  //             this.etapasCampos.at(id).patchValue(patchObject)
  //           }
  //         }
  //       }
  //     }
  //   })
  // }

  // borrarEmpleado(indice: number) {
  //   this.empleadosCampos.removeAt(indice);
  //   this.empleados = this.empleados.filter((empleado, index) => index !== indice)
  // }

}
