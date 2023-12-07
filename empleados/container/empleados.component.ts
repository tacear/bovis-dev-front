import { Component, OnInit } from '@angular/core';
import { CatPersonaDetalle, Empleado } from '../Models/empleados';
import {
  ConfirmationService,
  MessageService,
  PrimeNGConfig,
} from 'primeng/api';
import { EmpleadosService } from '../services/empleados.service';
import * as FileSaver from 'file-saver';
import * as XLSX from 'xlsx';
const EXCEL_EXTENSION = '.xlsx';
@Component({
  selector: 'app-empleados',
  templateUrl: './empleados.component.html',
  styleUrls: ['./empleados.component.css'],
})
export class EmpleadosComponent implements OnInit {
  header = [
    'Nombre',
    'RFC',
    'Fecha de Nacimiento',
    'Email',
    'Telefono',
    'Celular',
    'Curp',
    'Sexo',
    'Tipo Persona',
    'EdoCivil',
    'TipoSangre',
    'Activo',
  ];
  //listPersonas: Array<CatPersonaDetalle> = new Array<CatPersonaDetalle>();
  listPersonas: CatPersonaDetalle[];
  selectedRegistros: CatPersonaDetalle[];
  // faAlignJustify = faAlignJustify;
  filtroApellido = '';
  requerid = {
    tipoVoto: false,
    numExpediente: false,
    tipoAsunto: false,
  };
  porcentaje = 35;
  size = 10;
  page = 1;
  ListEmpleadosModel: Empleado[] = [];
  constructor(
    private confirmationService: ConfirmationService,
    private messageService: MessageService,
    private primengConfig: PrimeNGConfig,
    private empleadosServ: EmpleadosService
  ) {}

  ngOnInit(): void {
    this.primengConfig.ripple = true;

    //console.log(localStorage.getItem("empleados"));
    if (localStorage.getItem('empleados') != null) {
      this.ListEmpleadosModel = JSON.parse(
        localStorage.getItem('empleados') || '[]'
      );
      //console.log(this.ListEmpleadosModel);
    }

    this.getDataPersonas();
  }

  getDataPersonas() {
    this.listPersonas = [];
    this.empleadosServ.getPersonasDetalle().subscribe((per) => {
      this.listPersonas = per.data;
    });
  }

  confirm(event: Event, empleado: Empleado) {
    this.confirmationService.confirm({
      target: event.target as EventTarget,
      message: '¿Estás seguro de eliminar el registro?',
      icon: 'pi  pi-trash c-del',
      accept: () => {
        setTimeout(() => {
          this.eliminarEmpleado(empleado);
          this.messageService.add({
            severity: 'success',
            summary: 'Empleado',
            detail: 'Registro eliminado correctamente',
          });
        }, 1000);
      },
      reject: () => {
        this.messageService.add({
          severity: 'warn',
          summary: 'Empleado',
          detail: 'Acción cancelada',
        });
      },
    });
  }

  eliminarEmpleado(empleado: Empleado) {
    const index = this.ListEmpleadosModel.findIndex(
      (obj) => obj.id == empleado.id
    );
    console.log(index);
    if (index > -1) {
      this.ListEmpleadosModel.splice(index, 1);
      localStorage.setItem(
        'empleados',
        JSON.stringify(this.ListEmpleadosModel)
      );
    }
    console.log(this.ListEmpleadosModel);
  }

  public exportJsonToExcel(fileName: string = 'personas'): void {
    // inserting first blank row
    const worksheet: XLSX.WorkSheet = XLSX.utils.json_to_sheet(
      this.listPersonas,
      this.getOptions(this.listPersonas)
    );

    //for (let i = 1, length = this.listBusquedaCompleto.length; i < length; i++) {
    // adding a dummy row for separation
    XLSX.utils.sheet_add_json(
      worksheet,
      [{}],
      this.getOptions(
        {
          data: [],
          skipHeader: true,
        },
        -1
      )
    );
    XLSX.utils.sheet_add_json(
      worksheet,
      this.listPersonas,
      this.getOptions(this.listPersonas, 1)
    );
    //}
    const workbook: XLSX.WorkBook = {
      Sheets: { Sheet1: worksheet },
      SheetNames: ['Sheet1'],
    };
    // save to file
    XLSX.writeFile(workbook, `${fileName}${EXCEL_EXTENSION}`);
  }

  private getOptions(json: any, origin?: number): any {
    // adding actual data
    const options = {
      skipHeader: true,
      origin: 1,
      header: ([] = []),
    };
    options.skipHeader = json.skipHeader ? json.skipHeader : false;
    if (!options.skipHeader && json.header && json.header.length) {
      options.header = json.header;
    }
    if (origin) {
      options.origin = origin ? origin : 1;
    }
    return options;
  }

}
