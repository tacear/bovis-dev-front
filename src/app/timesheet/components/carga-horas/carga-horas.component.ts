import { Component, OnInit } from '@angular/core';
import { PrimeNGConfig } from 'primeng/api';
import {
  BaseOtros,
  DiasHabiles,
  EmpleadosSub,
  ProyectosEmpleados,
  Subordinados,
  dtTotales,
} from '../../Models/timesheet';
import { TimesheetService } from '../../services/timesheet.service';

@Component({
  selector: 'app-carga-horas',
  templateUrl: './carga-horas.component.html',
  styleUrls: ['./carga-horas.component.css'],
})
export class CargaHorasComponent implements OnInit {
  isConsultaSeccion1: boolean = true;
  isConsulta: boolean = false;
  fechaCurrent: string;
  userMail: string | null = '';
  empleadosSub: EmpleadosSub[] = [];
  listSubordinados: Subordinados[];
  diasHab: DiasHabiles;
  user: string;
  dias: number;
  sabados: string = 'Si';
  listBaseOtros: BaseOtros[] = [];
  listProyectosEmpleados: ProyectosEmpleados[] = [];
  totalesOtros: dtTotales;

  constructor(
    private config: PrimeNGConfig,
    private timeServ: TimesheetService
  ) {
    this.userMail = localStorage.getItem('userMail');
    this.user = localStorage.getItem('currentUser');
  }

  ngOnInit(): void {
    this.getConfigCalendar();
    this.getInicialDatosEjecutivo();
    let today = new Date();
    //console.log(today.toLocaleDateString());
    this.fechaCurrent = today.getUTCMonth() + 1 + '/' + today.getFullYear();
    this.getDiasHabiles();
  }

  getConfigCalendar() {
    this.config.setTranslation({
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
      today: 'Hoy',
      clear: 'Limpiar',
    });
  }

  getInicialDatosEjecutivo() {
    this.timeServ
      .getDatosEmpleadosSubordinados(this.userMail)
      .subscribe((time) => {
        this.listSubordinados = <Subordinados[]>time.data;
        //console.log(this.listSubordinados);
        this.listSubordinados.forEach((element) => {
          this.empleadosSub.push({
            name: `${String(element.nombre)} ${String(
              element.apPaterno
            )} ${String(element.apMaterno)}`,
            value: String(element.numEmpleadoRrHh),
          });
        });
      });
  }

  getDiasHabiles() {
    this.timeServ.getDiasHabiles(new Date()).subscribe((dias) => {
      this.diasHab = dias.data;
      //console.log(this.diasHab);
      //this.dias = this.diasHab.dias;
      this.onChangeType('Si', null);
      this.getBaseOtros();
    });
  }

  onChangeType(type: string, event: any) {
    /* console.log(type);
    console.log(event); */
    type == 'Si'
      ? (this.dias = this.diasHab.dias + this.diasHab.sabados)
      : (this.dias = this.diasHab.dias);
  }

  getBaseOtros() {
    this.timeServ.getBaseOtros().subscribe((base) => {
      this.listBaseOtros = [];
      this.listBaseOtros = base.data;
      this.totalesOtros = new dtTotales();
      this.listBaseOtros.forEach((element) => {
        this.diasHab?.feriados != undefined &&
        this.diasHab?.feriados != null &&
        this.diasHab?.feriados > 0
          ? (element.dias = this.diasHab?.feriados)
          : (element.dias = 0);
        let dedicacion: number = this.truncateDecimals((element.dias / this.dias) * 100, 2);
        element.dedicacion = `${String(dedicacion)}%`;
        //console.log( Math.floor(dedicacion * 100) / 100);
        this.totalesOtros.totalDias += element.dias;
        this.totalesOtros.totalDedicacion += dedicacion;
      });
      //console.log(this.listBaseOtros);
    });
  }

  /* getTruncate(number: number, digits: number) {
    var multiplier = Math.pow(10, digits),
        adjustedNum = number * multiplier,
        truncatedNum = Math[adjustedNum < 0 ? 'ceil' : 'floor'](adjustedNum);

    return truncatedNum / multiplier;
}; */

  truncateDecimals(number: number, digits: number) {
    var numS = number.toString(),
      decPos = numS.indexOf('.'),
      substrLength = decPos == -1 ? numS.length : 1 + decPos + digits,
      trimmedResult: any = numS.substr(0, substrLength),
      finalResult = isNaN(trimmedResult) ? 0 : trimmedResult;

    return parseFloat(finalResult);
  }

  getProyectosEmpleados(numEmpleadoRrHh: number) {
    this.timeServ.getProyectosEmpleados(numEmpleadoRrHh).subscribe((base) => {
      this.listProyectosEmpleados = [];
      this.listProyectosEmpleados = base.data;
      console.log(this.listProyectosEmpleados);
    });
  }

  onChangeEmpleado(event: any) {
    /* console.log('event :' + event);
     console.log(event.value); */
    if (event.value) {
      //console.log(event.value['value']);
      this.getProyectosEmpleados(Number(event.value['value'].toString()));
    } else {
      this.listProyectosEmpleados = [];
    }
  }
}
