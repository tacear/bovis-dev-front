import { Component, OnInit } from '@angular/core';
import { PrimeNGConfig } from 'primeng/api';
import { ICatalogo, ICatalogoCliente, ICatalogoCombos, IEmpleado } from '../../models/ip';
import { CatalogosService } from '../../services/catalogos.service';

@Component({
  selector: 'app-ip',
  templateUrl: './ip.component.html',
  styleUrls: ['./ip.component.css']
})
export class IpComponent implements OnInit {

  isConsulta: boolean = false;

  catSectores: ICatalogoCombos[] = [];
  catPaises: ICatalogoCombos[] = [];
  catClientes: ICatalogoCombos[] = [];
  catEstatusProyecto: ICatalogoCombos[] = [];
  catEmpleados: ICatalogoCombos[] = [];

  listCatSectores: Array<ICatalogo> = [];
  listCatPaises: Array<ICatalogo> = [];
  listCatClientes: Array<ICatalogoCliente> = [];
  listCatEstatusProyecto: Array<ICatalogo> = [];
  listEmpleados: Array<IEmpleado> = [];

  constructor(private config: PrimeNGConfig, private catServ: CatalogosService) { }

  ngOnInit(): void {
    this.poblarCombos();
    this.getConfigCalendar();
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

  poblarCombos() {
    this.getCatCategorias();
    this.getPaises();
    this.getClientes();
    this.getEstatusProyecto();
    this.getEmpleados();
  }

  getCatCategorias() {
    this.listCatSectores = [];
    this.catServ.getSectores().subscribe((data) => {
      if (data.success) {
        this.listCatSectores = <ICatalogo[]>data['data'];
        this.listCatSectores.forEach((element) => {
          this.catSectores.push({
            name: String(element.descripcion),
            value: String(element.id),
          });
        });
      }
    });
  }

  getPaises() {
    this.listCatPaises = [];
    this.catServ.getPais().subscribe((data) => {
      if (data.success) {
        this.listCatPaises = <ICatalogo[]>data['data'];
        this.listCatPaises.forEach((element) => {
          this.catPaises.push({
            name: String(element.descripcion),
            value: String(element.id),
          });
        });
      }
    });
  }

  getClientes() {
    this.listCatClientes = [];
    this.catServ.getClientes().subscribe((data) => {
      if (data.success) {
        this.listCatClientes = <ICatalogoCliente[]>data['data'];
        this.listCatClientes.forEach((element) => {
          this.catClientes.push({
            name: String(element.cliente),
            value: String(element.idCliente),
          });
        });
      }
    });
  }

  getEstatusProyecto() {
    this.listCatEstatusProyecto = [];
    this.catServ.getEstatusProyecto().subscribe((data) => {
      if (data.success) {
        this.listCatEstatusProyecto = <ICatalogo[]>data['data'];
        this.listCatEstatusProyecto.forEach((element) => {
          this.catEstatusProyecto.push({
            name: String(element.descripcion),
            value: String(element.id),
          });
        });
      }
    });
  }

  getEmpleados() {
    this.listEmpleados = [];
    this.catServ.getEmpleados().subscribe((data) => {
      if (data.success) {
        this.listEmpleados = <IEmpleado[]>data['data'];
        this.listEmpleados.forEach((element) => {
          this.catEmpleados.push({
            name: String(`${element.nombre} ${element.apPaterno} ${element.apMaterno} / ${element.puesto}`),
            value: String(element.numEmpleadoRrHh),
          });
        });
      }
    });
  }

}
