import { Component, OnInit, ViewChild } from '@angular/core';
import { MessageService, PrimeNGConfig } from 'primeng/api';
import {
  Busqueda,
  BusquedaCancelacion,
  Clientes,
  Empresas,
  Proyectos,
  facturaCancelacion,
} from '../../Models/FacturacionModels';
import { FacturacionService } from '../../services/facturacion.service';
import * as FileSaver from 'file-saver';
import * as XLSX from 'xlsx';
import { Dropdown } from 'primeng/dropdown';
import { DialogService, DynamicDialogRef } from 'primeng/dynamicdialog';

const EXCEL_EXTENSION = '.xlsx';

interface FiltroCancelacion {
  name: string;
  value: string;
}

@Component({
  selector: 'app-busqueda-cancelacion',
  templateUrl: './busqueda-cancelacion.component.html',
  styleUrls: ['./busqueda-cancelacion.component.css'],
})
export class BusquedaCancelacionComponent implements OnInit {
  //objBusqueda: Busqueda = new Busqueda();
  listBusquedaCompleto: Array<BusquedaCancelacion> =
    new Array<BusquedaCancelacion>();
  listBusquedaUnique: Array<BusquedaCancelacion> =
    new Array<BusquedaCancelacion>();
  listBusquedaModal: Array<BusquedaCancelacion> =
    new Array<BusquedaCancelacion>();
  listProyectos: Proyectos[] = [];
  listEmpresas: Empresas[] = [];
  listClientes: Clientes[] = [];
  filtroProyectos: FiltroCancelacion[] = [];
  filtroEmpresas: FiltroCancelacion[] = [];
  filtroClientes: FiltroCancelacion[] = [];

  isDisableProyecto: boolean = false;
  isDisableEmpresa: boolean = false;
  isDisableCliente: boolean = false;
  isClear: boolean = false;

  @ViewChild('dropDownProyecto') dropDownProyecto: Dropdown;
  @ViewChild('dropDownEmpresa') dropDownEmpresa: Dropdown;
  @ViewChild('dropDownCliente') dropDownCliente: Dropdown;
  maxDate: Date;
  fechaInicio: Date;
  fechaFin: Date;
  opcionFiltro: number = 0;
  filtroValue: number;
  displayModal: boolean;
  motivoCancelacion: string = '';
  count_carapteres: number = 20;
  idCancelacion: number;
  ref: DynamicDialogRef;
  headerModalCancelacion: string = '';
  isCancelacionVisible: boolean;
  isTypeHeader: boolean;

  constructor(
    private config: PrimeNGConfig,
    private facturacionService: FacturacionService,
    private messageService: MessageService
  ) {}

  ngOnInit(): void {
    this.maxDate = new Date();
    this.getConfigCalendar();
    this.listBusquedaCompleto = new Array<BusquedaCancelacion>();
    this.listBusquedaUnique = new Array<BusquedaCancelacion>();

    this.getPoblarProyectos();
    this.getPoblarEmpresas();
    this.getPoblarClientes();
  }

  getPoblarProyectos() {
    this.facturacionService.getProyectos().subscribe({
      next: (data) => {
        if (data.success) {
          this.listProyectos = data.data;

          this.listProyectos.forEach((element) => {
            this.filtroProyectos.push({
              name: `${String(element.numProyecto)} / ${String(element.nombre)}`,
              value: String(element.numProyecto),
            });
          });
        } else {
          this.messageError(data.message, 'Información de Proyectos');
        }
      },
      error: (e) => {
        this.messageError(e.message, 'Información de Proyectos');
      }
    });
  }

  getPoblarEmpresas() {
    this.facturacionService.getEmpresas().subscribe({
      next: (data) => {
        if (data.success) {
          this.listEmpresas = data.data;
          this.listEmpresas.forEach((element) => {
            this.filtroEmpresas.push({
              name: `${String(element.rfc)} / ${String(element.empresa)}`,
              value: String(element.idEmpresa),
            });
          });
        }
        else{
          this.messageError(data.message, 'Información de Empresas');
        }
      },
      error: (e) => {
        this.messageError(e.message, 'Información de Empresas');
      }
    });
  }

  getPoblarClientes() {
    this.facturacionService.getClientes().subscribe({

      next: (data) => {
        if (data.success) {
          this.listClientes = data.data;
          this.listClientes.forEach((element) => {
            this.filtroClientes.push({
              name: `${String(element.rfc)} / ${String(element.cliente)}`,
              value: String(element.idCliente),
            });
          });
        }
        else{
          this.messageError(data.message, 'Información de Clientes');
        }

      },
      error: (e) => {
        this.messageError(e.message, 'Información de Clientes');
      }
    });
  }

  messageError(message: string, tipo: string) {
    this.messageService.add({
      severity: "error",
      summary: tipo,
      detail: String(message)
    });

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

  busqueda() {
    this.listBusquedaCompleto = new Array<BusquedaCancelacion>();
    this.listBusquedaUnique = new Array<BusquedaCancelacion>();
    this.facturacionService
      .getBusqueda(this.getFiltrosVaues())
      .subscribe((bus) => {
        //console.log(bus);
        this.listBusquedaCompleto = bus.data;
        //console.log(this.listBusquedaCompleto);
        this.listBusquedaUnique = [
          ...new Map(
            this.listBusquedaCompleto.map((item) => [item['uuid'], item])
          ).values(),
        ];
        //console.log(this.listBusquedaUnique);
      });
  }

  getFiltrosVaues() {
    let objBusqueda: Busqueda = new Busqueda();
    if (this.opcionFiltro == 0) {
      let utc = new Date().toJSON().slice(0, 10).replace(/-/g, '-');
      //console.log(utc);
      objBusqueda.fechaFin = utc;
    } else {
      let utcFin = this.fechaFin.toJSON().slice(0, 10).replace(/-/g, '-');
      //console.log(utcFin);
      objBusqueda.fechaFin = utcFin;
      if (this.fechaInicio != null) {
        let utcInicio = this.fechaInicio
          .toJSON()
          .slice(0, 10)
          .replace(/-/g, '-');
        //console.log(utcInicio);
        objBusqueda.fechaIni = utcInicio;
      }

      switch (this.opcionFiltro) {
        case 1:
          objBusqueda.idProyecto = this.filtroValue;
          break;
        case 2:
          objBusqueda.idEmpresa = this.filtroValue;
          break;
        case 3:
          objBusqueda.idCliente = this.filtroValue;
          break;
      }
    }
    //console.log(objBusqueda);
    return objBusqueda;
  }

  getHeadersTabla() {
    return [
      'UUID',
      'Num Proyecto',
      'ID Tipo Factura',
      'ID Moneda',
      'Importe',
      'Iva',
      'IvaRet',
      'Total',
      'Concepto',
      'Mes',
      'Año',
      'Fecha Emision',
      'Fecha Pago',
      'Fecha Cancelacion',
      'No Factura',
      'Tipo Cambio',
      'Motivo Cancelacion',
      /* 'NC Uuid Nota Credito',
      'NC Id Moneda',
      'NC Id Tipo Relacion',
      'NC Nota Credito',
      'NC Importe',
      'NC Iva',
      'NC Total',
      'NC Concepto',
      'NC Mes',
      'NC Año',
      'NC Tipo Cambio',
      'NC Fecha Nota Credito',
      'C Uuid Cobranza',
      'C Id MonedaP',
      'C Importe Pagado',
      'C Imp Saldo Ant',
      'C Importe Saldo Insoluto',
      'C Iva P',
      'C Tipo Cambio P',
      'C Fecha Pago', */
    ];
  }

  getHeadersModal() {
    if (this.isTypeHeader) {
      this.headerModalCancelacion = 'Notas de crédito';
      return [
        'NC Uuid Nota Credito',
        'NC Id Moneda',
        'NC Id Tipo Relacion',
        'NC Nota Credito',
        'NC Importe',
        'NC Iva',
        'NC Total',
        'NC Concepto',
        'NC Mes',
        'NC Año',
        'NC Tipo Cambio',
        'NC Fecha Nota Credito',
      ];
    } else {
      this.headerModalCancelacion = 'Pagos';
      return [
        'C Uuid Cobranza',
        'C Id MonedaP',
        'C Importe Pagado',
        'C Imp Saldo Ant',
        'C Importe Saldo Insoluto',
        'C Iva P',
        'C Tipo Cambio P',
        'C Fecha Pago',
      ];
    }
  }

  exportExcel() {
    console.log(111);

    /* import('xlsx').then(xlsx => {
        const worksheet = xlsx.utils.json_to_sheet(this.listBusquedaCompleto);
        const workbook = { Sheets: { 'data': worksheet }, SheetNames: ['data'] };
        const excelBuffer: any = xlsx.write(workbook, { bookType: 'xlsx', type: 'array' });
        this.saveAsExcelFile(excelBuffer, "products");
    }); */
    /* pass here the table id */
    //let element = document.getElementById(this.listBusquedaCompleto);

    /* const ws: XLSX.WorkSheet =XLSX.utils.table_to_sheet(this.listBusquedaCompleto);

   // generate workbook and add the worksheet
    const wb: XLSX.WorkBook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, 'Sheet1');

  // save to file
    XLSX.writeFile(wb, "Facturacion"); */
  }

  saveAsExcelFile(buffer: any, fileName: string): void {
    /*  let EXCEL_TYPE = 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8';
  let EXCEL_EXTENSION = '.xlsx';
  const data: Blob = new Blob([buffer], {
      type: EXCEL_TYPE
  });
  FileSaver.saveAs(data, fileName + '_export_' + new Date().getTime() + EXCEL_EXTENSION); */
  }

  public exportJsonToExcel(fileName: string = 'facturacion_cancelacion'): void {
    // inserting first blank row
    const worksheet: XLSX.WorkSheet = XLSX.utils.json_to_sheet(
      this.listBusquedaCompleto,
      this.getOptions(this.listBusquedaCompleto)
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
      this.listBusquedaCompleto,
      this.getOptions(this.listBusquedaCompleto, 1)
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

  onChangeCombo(event: any, opcion: number) {
    /*console.log('event :' + event);
    console.log(event.value);*/
    if (event.value != null) {
      this.isClear = true;
      this.disableFiltros(opcion);
      this.opcionFiltro = opcion;
      this.fechaFin = new Date();
      this.filtroValue = event.value['value'];
      //console.log(this.filtroValue);
    } else {
      this.isClear = false;
    }
  }

  disableFiltros(opcion: number) {
    switch (opcion) {
      case 1:
        this.isDisableEmpresa = true;
        this.isDisableCliente = true;
        break;
      case 2:
        this.isDisableProyecto = true;
        this.isDisableCliente = true;
        break;
      case 3:
        this.isDisableProyecto = true;
        this.isDisableEmpresa = true;
        break;
    }
  }

  clearFiltros() {
    this.dropDownProyecto.clear(null);
    this.dropDownEmpresa.clear(null);
    this.dropDownCliente.clear(null);

    this.isDisableProyecto = false;
    this.isDisableEmpresa = false;
    this.isDisableCliente = false;

    this.fechaInicio = null;
    this.fechaFin = null;

    this.opcionFiltro = 0;
  }

  showModalDialog(id: number) {
    this.idCancelacion = id;
    this.motivoCancelacion = '';
    this.displayModal = true;
  }

  changeCancelar() {
    let cancelacion: facturaCancelacion = new facturaCancelacion();
    cancelacion.id = this.idCancelacion;
    cancelacion.MotivoCancelacion = this.motivoCancelacion;

    this.facturacionService
      .facturaCancelacion(cancelacion)
      .subscribe((cancel) => {
        if (cancel.data) {
          this.messageService.add({
            severity: 'success',
            summary: 'Cancelar registro',
            detail: `Cancelación realizada correctamente`,
          });
          this.busqueda();
        }
      });
    this.displayModal = false;
  }

  show(tipoModal: boolean, uuid: string) {
    this.isCancelacionVisible = true;
    tipoModal ? (this.isTypeHeader = true) : (this.isTypeHeader = false);

    this.listBusquedaModal = new Array<BusquedaCancelacion>();
    console.log(this.listBusquedaCompleto);

    this.listBusquedaModal = this.listBusquedaCompleto.filter(
      (xx) => xx.uuid == uuid
    );
    console.log(this.listBusquedaModal);
  }

}
