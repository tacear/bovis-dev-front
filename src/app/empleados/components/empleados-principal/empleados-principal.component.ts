import { Component, OnInit } from '@angular/core';
import { EmpleadosService } from '../../services/empleados.service';
import { CatEmpleadoDetalle, CatEmpleadoDetalleExcel } from '../../Models/empleados';
import * as FileSaver from 'file-saver';
import * as XLSX from 'xlsx';
const EXCEL_EXTENSION = '.xlsx';

@Component({
  selector: 'app-empleados-principal',
  templateUrl: './empleados-principal.component.html',
  styleUrls: ['./empleados-principal.component.css']
})
export class EmpleadosPrincipalComponent implements OnInit {

  header = [
    'Número de empleado RRHH',
    'Persona',
    'Tipo empleado',
    'Categoria',
    'Tipo de contrato',
    'Puesto',
    'Empresa',
    'Ciudad',
    'Nivel de estudios',
    'Forma de pago',
    'Jornada',
    'Departamento',
    'Clasificación',
    'Número de directo',
    'Número de negocio',
    'Número de sat',
    'Número de empleado',
    'Fecha de ingreso',
    'Fecha de salida',
    'Fecha de reingreso',
    'Nss',
    'Email Bovis',
    'Experiencias',
    'Habilidades',
    'Repositorio',
    'Salario',
    'Profesión',
    'Antiguedad',
    'Turno',
    'Unidad medica',
    'Registro patronal',
    'Cotización',
    'Duración',
    'Activo',
    'Descuento de pension',
    'Pension',
    'Fondo fijo',
    'Número de infonavit',
    'Tipo descuento',
    'Descuento',
    'Número de noi'
  ];

  listEmpleados: Array<CatEmpleadoDetalle> = new Array<CatEmpleadoDetalle>();
  selectedRegistros: Array<CatEmpleadoDetalle> = new Array<CatEmpleadoDetalle>();
  listEmpleadosExcel: Array<CatEmpleadoDetalleExcel> = new Array<CatEmpleadoDetalleExcel>();

  constructor(private empleadosServ: EmpleadosService) { }

  ngOnInit(): void {
    this.getDataEmpleados();
  }

  getDataEmpleados() {
    this.listEmpleados = [];
    this.empleadosServ.getEmpleadosDetalle().subscribe((emp) => {
      this.listEmpleados = emp.data;

      if (this.listEmpleados.length > 0) {
        this.listEmpleadosExcel = new Array<CatEmpleadoDetalleExcel>();
        this.listEmpleados.forEach(element => {
          let objExport: CatEmpleadoDetalleExcel = new CatEmpleadoDetalleExcel();

          objExport.numEmpleadoRrHh = element.numEmpleadoRrHh;
          objExport.nombre = element.nombre;
          objExport.apPaterno = element.apPaterno;
          objExport.apMaterno = element.apMaterno;
          objExport.categoria = element.categoria;
          objExport.tipoContrato = element.tipoContrato;
          objExport.cvePuesto = element.cvePuesto;
          objExport.empresa = element.empresa;
          objExport.ciudad = element.ciudad;
          objExport.nivelEstudios = element.nivelEstudios;
          objExport.formaPago = element.formaPago;
          objExport.jornada = element.jornada;
          objExport.departamento = element.departamento;
          objExport.clasificacion = element.clasificacion;
          objExport.jefeDirecto = element.jefeDirecto;
          objExport.unidadNegocio = element.unidadNegocio;
          objExport.tipoContratoSat = element.tipoContratoSat;
          objExport.numEmpleado = element.numEmpleado;
          objExport.fechaIngreso = element.fechaIngreso;
          objExport.fechaSalida = element.fechaSalida;
          objExport.fechaUltimoReingreso = element.fechaUltimoReingreso;
          objExport.nss = element.nss;
          objExport.emailBovis = element.emailBovis;
          objExport.experiencias = element.experiencias;
          objExport.habilidades = element.habilidades;
          objExport.urlRepositorio = element.urlRepositorio;
          objExport.salario = element.salario;
          objExport.profesion = element.profesion;
          objExport.antiguedad = element.antiguedad;
          objExport.turno = element.turno;
          objExport.unidadMedica = element.unidadMedica;
          objExport.registroPatronal = element.registroPatronal;
          objExport.cotizacion = element.cotizacion;
          objExport.duracion = element.duracion;
          objExport.activo = element.activo;
          objExport.descuentoPension = element.descuentoPension;
          objExport.porcentajePension = element.porcentajePension;
          objExport.fondoFijo = element.fondoFijo;
          objExport.creditoInfonavit = element.creditoInfonavit;
          objExport.tipoDescuento = element.tipoDescuento;
          objExport.valorDescuento = element.valorDescuento;
          objExport.empleadoNoi = objExport.empleadoNoi;


          this.listEmpleadosExcel.push(objExport);
        });
      }


    });
  }

  public exportJsonToExcel(fileName: string = 'empleados'): void {
    // inserting first blank row
    const worksheet: XLSX.WorkSheet = XLSX.utils.json_to_sheet(
      this.listEmpleadosExcel,
      this.getOptions(this.listEmpleadosExcel)
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
      this.listEmpleadosExcel,
      this.getOptions(this.listEmpleadosExcel, 1)
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
