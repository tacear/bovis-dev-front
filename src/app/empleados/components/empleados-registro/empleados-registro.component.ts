import { Component, OnInit } from '@angular/core';
// import { NgbCalendar, NgbDateStruct } from '@ng-bootstrap/ng-bootstrap';
import { CatEmpleado, ICatalogo, Empleado, IEmpresa, ICatalogoCombos, ICatPersona } from '../../Models/empleados';
import { ActivatedRoute, Router } from '@angular/router';
import { Message, MessageService, PrimeNGConfig } from 'primeng/api';
import { EmpleadosService } from '../../services/empleados.service';


@Component({
  selector: 'app-empleados-registro',
  templateUrl: './empleados-registro.component.html',
  styleUrls: ['./empleados-registro.component.css'],
})

export class EmpleadosRegistroComponent implements OnInit {

  empleadoModel: Empleado = new Empleado();
  idEmpleado: number;
  disabled = false;
  isEditar = true;
  isConsulta: boolean = false;
  isConsultaButons: boolean = false;
  isUpdate: boolean = false;
  listPersonas: Array<ICatPersona> = [];
  listTipoEmpleados: Array<ICatalogo> = [];
  listCategorias: Array<ICatalogo> = [];
  listTipoContratos: Array<ICatalogo> = [];
  listEmpresas: Array<IEmpresa> = [];
  listCiudades: Array<ICatalogo> = [];
  listNivelEstudios: Array<ICatalogo> = [];
  listFormasPago: Array<ICatalogo> = [];
  listJornadas: Array<ICatalogo> = [];
  listDepartamentos: Array<ICatalogo> = [];
  listClasificacion: Array<ICatalogo> = [];
  listJefesDirecto: Array<ICatalogo> = [];
  listUnidadNegocio: Array<ICatalogo> = [];

  catPersonas: ICatalogoCombos[] = [];
  catTipoEmpleados: ICatalogoCombos[] = [];
  catCategorias: ICatalogoCombos[] = [];
  catTipoContratos: ICatalogoCombos[] = [];
  catEmpresas: ICatalogoCombos[] = [];
  catCiudades: ICatalogoCombos[] = [];
  catNivelEstudios: ICatalogoCombos[] = [];
  catFormasPago: ICatalogoCombos[] = [];
  catJornadas: ICatalogoCombos[] = [];
  catDepartamentos: ICatalogoCombos[] = [];
  catClasificacion: ICatalogoCombos[] = [];
  catJefesDirecto: ICatalogoCombos[] = [];
  catUnidadNegocio: ICatalogoCombos[] = [];

  fechaIngreso: Date;
  fechaSalida: Date;
  fechaReingreso: Date;

  empleado: CatEmpleado = new CatEmpleado();
  mensajeCamposRequeridos: string = '';
  isCamposRequeridos = false;
  messages1: Message[];
  selectedPersona: string = '';
  numEmpleadoRrHh: number;

  sPersonas: ICatalogoCombos;
  sTipoEmpleado: ICatalogoCombos;
  sCategoria: ICatalogoCombos;
  sTipoContrato: ICatalogoCombos;
  sEmpresa: ICatalogoCombos;
  sCiudad: ICatalogoCombos;
  sNivelEstudios: ICatalogoCombos;
  sFormaPago: ICatalogoCombos;
  sJornada: ICatalogoCombos;
  sDepartamento: ICatalogoCombos;
  sClasificacion: ICatalogoCombos;
  sUnidadNegocio: ICatalogoCombos;

  constructor(
    private params: ActivatedRoute,
    private config: PrimeNGConfig,
    private empleadosServ: EmpleadosService,
    private messageService: MessageService,
    private router: Router,
    private route: ActivatedRoute
  ) { }

  poblarCombos() {
    this.getConfigCalendar();
    this.getCatPersonas();
    this.getCatTipoEmpleado();
    this.getCatCategorias();
    this.getCatTipoContratos();
    this.getCatEmpresas();
    this.getCatCiudades();
    this.getCatNivelEstuidios();
    this.getCatFormasPago();
    this.getCatJornadas();
    this.getCatDepartamentos();
    this.getCatClasificacion();
    //this.getCatJefeDirecto();//falta servicio
    this.getCatUnidadNegocio();
  }

  ngOnInit(): void {
    this.poblarCombos();
    this.route.paramMap.subscribe(paramMap => {
      //console.log(paramMap.get('id'));
      if (paramMap.get('id') != null) {
        this.isUpdate = true;
        this.numEmpleadoRrHh = Number(paramMap.get('id').toString());
        this.getEmpleados();
      } else {
        this.numEmpleadoRrHh = null;
      }
    });
  }

  getEmpleados() {
    this.empleadosServ.getEmpleados().subscribe((emp) => {
      let listEmpleado: Array<CatEmpleado> = emp.data;
      this.empleado = listEmpleado.find(xx => xx.numEmpleadoRrHh == this.numEmpleadoRrHh);
      console.log(this.empleado);
      this.fechaSalida = new Date(this.empleado.fechaSalida);
      this.fechaReingreso = new Date(this.empleado.fechaUltimoReingreso);
      this.fechaIngreso = new Date(this.empleado.fechaIngreso);

      this.sPersonas = this.catPersonas.find((xx => Number(xx.value) == this.empleado.idPersona));
      this.sTipoEmpleado = this.catTipoEmpleados.find((xx => Number(xx.value) == this.empleado.idTipoEmpleado));
      this.sCategoria = this.catCategorias.find((xx => Number(xx.value) == this.empleado.idCategoria));
      this.sTipoContrato = this.catTipoContratos.find((xx => Number(xx.value) == this.empleado.idTipoContrato));
      this.sEmpresa = this.catEmpresas.find((xx => Number(xx.value) == this.empleado.idEmpresa));
      this.sCiudad = this.catCiudades.find((xx => Number(xx.value) == this.empleado.idCiudad));
      this.sNivelEstudios = this.catNivelEstudios.find((xx => Number(xx.value) == this.empleado.idNivelEstudios));
      this.sFormaPago = this.catFormasPago.find((xx => Number(xx.value) == this.empleado.idFormaPago));
      this.sJornada = this.catJornadas.find((xx => Number(xx.value) == this.empleado.idJornada));
      this.sDepartamento = this.catDepartamentos.find((xx => Number(xx.value) == this.empleado.idDepartamento));
      this.sClasificacion = this.catClasificacion.find((xx => Number(xx.value) == this.empleado.idClasificacion));
      this.sUnidadNegocio = this.catUnidadNegocio.find((xx => Number(xx.value) == this.empleado.idUnidadNegocio));

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

  guardar() {
    console.log(this.empleado);
    this.camposRequeridos();

    if (this.mensajeCamposRequeridos == '') {
      console.log('todo bien....');
      this.isCamposRequeridos = false;
      this.asignaValuesFechas();

      this.empleadosServ.saveEmpleado(this.empleado).subscribe({
        next: (data) => {
          console.log(data);
          if (data.success) {

            this.messageService.add({
              severity: "success",
              summary: "Empleado",
              detail: "Registro guardado correctamente",
              life: 2000
            });
            setTimeout(
              () => {
                this.router.navigate(['/empleados', 'empleado-pri']);
              }, 1500);
          } else {
            console.log(data);
            //this.menssageError(error);
          }
        },
        error: (e) => {
          console.log(e);
          let error = `${e.message} <br/> ${e.error.errors}`
          this.menssageError(error);
        }
      });
    } else {
      this.isCamposRequeridos = true;
      this.messages1 = [
        {
          severity: 'error',
          summary: 'Campos requeridos',
          detail: this.mensajeCamposRequeridos,
        },
      ];
    }
  }

  asignaValuesFechas() {
    this.fechaIngreso != undefined && this.fechaIngreso != null
      ? (this.empleado.fechaIngreso = this.fechaIngreso
        .toJSON()
        .slice(0, 10)
        .replace(/-/g, '-'))
      : '';

    this.fechaReingreso != undefined && this.fechaReingreso != null
      ? (this.empleado.fechaUltimoReingreso = this.fechaReingreso
        .toJSON()
        .slice(0, 10)
        .replace(/-/g, '-'))
      : '';

    this.fechaSalida != undefined && this.fechaSalida != null
      ? (this.empleado.fechaSalida = this.fechaSalida
        .toJSON()
        .slice(0, 10)
        .replace(/-/g, '-'))
      : '';

  }

  menssageError(mensaje: string) {
    this.messageService.add({
      severity: 'error',
      summary: 'Error',
      detail: mensaje,
      life: 4000,
    });
  }

  camposRequeridos() {
    this.mensajeCamposRequeridos = '';
    this.empleado.numEmpleadoRrHh == null
      ? (this.mensajeCamposRequeridos += 'Numero de empleado RRHH, ')
      : '';
    this.empleado.idPersona == null
      ? (this.mensajeCamposRequeridos += 'Persona, ')
      : '';
    this.empleado.idTipoEmpleado == null
      ? (this.mensajeCamposRequeridos += 'Tipo empleado, ')
      : '';
    this.empleado.idCategoria == null
      ? (this.mensajeCamposRequeridos += 'Categoria, ')
      : '';
    this.empleado.idTipoContrato == null
      ? (this.mensajeCamposRequeridos += 'Tipo Contrato, ')
      : '';
    this.empleado.cvePuesto == ''
      ? (this.mensajeCamposRequeridos += 'Puesto, ')
      : '';
    this.empleado.idEmpresa == null
      ? (this.mensajeCamposRequeridos += 'Empresa, ')
      : '';
    this.empleado.idCiudad == null
      ? (this.mensajeCamposRequeridos += 'Ciudad, ')
      : '';
    this.empleado.idNivelEstudios == null
      ? (this.mensajeCamposRequeridos += 'Nivel de Estudios, ')
      : '';
    this.empleado.idFormaPago == null
      ? (this.mensajeCamposRequeridos += 'Forma de pago, ')
      : '';
    this.fechaIngreso == undefined
      ? (this.mensajeCamposRequeridos += 'Fecha Ingreso, ')
      : '';
    this.empleado.salario == null
      ? (this.mensajeCamposRequeridos += 'Salario, ')
      : '';
    this.empleado.profesion == ''
      ? (this.mensajeCamposRequeridos += 'Profesión, ')
      : '';
    this.empleado.antiguedad == null
      ? (this.mensajeCamposRequeridos += 'Antiguedad, ')
      : '';
    /*  this.empleado.turno == ''
      ? (this.mensajeCamposRequeridos += 'Turno, ')
      : ''; */
  }

  clear() {
    this.empleado = new CatEmpleado();
    this.fechaIngreso = null;
    this.fechaSalida = null;
    this.fechaReingreso = null;
  }

  getCatPersonas() {
    this.listPersonas = [];
    this.empleadosServ.getCatPersonas().subscribe((data) => {
      //console.log(data);
      if (data.success) {
        this.listPersonas = <ICatPersona[]>data['data'];
        this.listPersonas.forEach((element) => {
          this.catPersonas.push({
            name: String(`${element.nombre} ${element.apMaterno} ${element.apMaterno}`),
            value: String(element.idPersona),
          });
        });
      }
    });
  }

  getCatTipoEmpleado() {
    this.listTipoEmpleados = [];
    this.empleadosServ.getCatEmpleados().subscribe((data) => {
      if (data.success) {
        this.listTipoEmpleados = <ICatalogo[]>data['data'];
        this.listTipoEmpleados.forEach((element) => {
          this.catTipoEmpleados.push({
            name: String(element.descripcion),
            value: String(element.id),
          });
        });
      }
    });
  }

  getCatCategorias() {
    this.listCategorias = [];
    this.empleadosServ.getCatCategorias().subscribe((data) => {
      if (data.success) {
        this.listCategorias = <ICatalogo[]>data['data'];
        this.listCategorias.forEach((element) => {
          this.catCategorias.push({
            name: String(element.descripcion),
            value: String(element.id),
          });
        });
      }
    });
  }

  getCatTipoContratos() {
    this.listTipoContratos = [];
    this.empleadosServ.getCatTiposContratos().subscribe((data) => {
      if (data.success) {
        this.listTipoContratos = <ICatalogo[]>data['data'];
        this.listTipoContratos.forEach((element) => {
          this.catTipoContratos.push({
            name: String(element.descripcion),
            value: String(element.id),
          });
        });
      }
    });
  }

  getCatEmpresas() {
    this.listEmpresas = [];
    this.empleadosServ.getCatEmpresas().subscribe((data) => {
      if (data.success) {
        this.listEmpresas = <IEmpresa[]>data['data'];
        this.listEmpresas.forEach((element) => {
          this.catEmpresas.push({
            name: String(`${element.empresa} / ${element.rfc}`),
            value: String(element.idEmpresa),
          });
        });
      }
    });
  }

  getCatCiudades() {
    this.listCiudades = [];
    this.empleadosServ.getCatCiudades().subscribe((data) => {
      if (data.success) {
        this.listCiudades = <ICatalogo[]>data['data'];
        this.listCiudades.forEach((element) => {
          this.catCiudades.push({
            name: String(element.descripcion),
            value: String(element.id),
          });
        });
      }
    });
  }

  getCatNivelEstuidios() {
    this.listNivelEstudios = [];
    this.empleadosServ.getCatNivelEstudios().subscribe((data) => {
      if (data.success) {
        this.listNivelEstudios = <ICatalogo[]>data['data'];
        this.listNivelEstudios.forEach((element) => {
          this.catNivelEstudios.push({
            name: String(element.descripcion),
            value: String(element.id),
          });
        });
      }
    });
  }

  getCatFormasPago() {
    this.listFormasPago = [];
    this.empleadosServ.getCatFormasPago().subscribe((data) => {
      if (data.success) {
        this.listFormasPago = <ICatalogo[]>data['data'];
        this.listFormasPago.forEach((element) => {
          this.catFormasPago.push({
            name: String(element.descripcion),
            value: String(element.id),
          });
        });
      }
    });
  }

  getCatJornadas() {
    this.listJornadas = [];
    this.empleadosServ.getCatJornadas().subscribe((data) => {
      if (data.success) {
        this.listJornadas = <ICatalogo[]>data['data'];
        this.listJornadas.forEach((element) => {
          this.catJornadas.push({
            name: String(element.descripcion),
            value: String(element.id),
          });
        });
      }
    });
  }

  getCatDepartamentos() {
    this.listDepartamentos = [];
    this.empleadosServ.getCatDepartamentos().subscribe((data) => {
      if (data.success) {
        this.listDepartamentos = <ICatalogo[]>data['data'];
        this.listDepartamentos.forEach((element) => {
          this.catDepartamentos.push({
            name: String(element.descripcion),
            value: String(element.id),
          });
        });
      }
    });
  }

  getCatClasificacion() {
    this.listClasificacion = [];
    this.empleadosServ.getCatClasificacion().subscribe((data) => {
      if (data.success) {
        this.listClasificacion = <ICatalogo[]>data['data'];
        this.listClasificacion.forEach((element) => {
          this.catClasificacion.push({
            name: String(element.descripcion),
            value: String(element.id),
          });
        });
      }
    });
  }

  getCatJefeDirecto() {
    this.listJefesDirecto = [];
    this.empleadosServ.getCatClasificacion().subscribe((data) => {
      if (data.success) {
        this.listJefesDirecto = <ICatalogo[]>data['data'];
        this.listJefesDirecto.forEach((element) => {
          this.catJefesDirecto.push({
            name: String(element.descripcion),
            value: String(element.id),
          });
        });
      }
    });
  }

  getCatUnidadNegocio() {
    this.listUnidadNegocio = [];
    this.empleadosServ.getCatUnidadNegocio().subscribe((data) => {
      if (data.success) {
        this.listUnidadNegocio = <ICatalogo[]>data['data'];
        this.listUnidadNegocio.forEach((element) => {
          this.catUnidadNegocio.push({
            name: String(element.descripcion),
            value: String(element.id),
          });
        });
      }
    });
  }

  onChangeComboPersona(event: any) {
    /* console.log('event :' + event);
    console.log(event.value); */
    if (event.value != null) {
      this.empleado.idPersona = Number.parseInt(String(event.value['value']));
    } else {
      console.log(event);
      this.empleado.idPersona = null;
      this.selectedPersona = '';
    }
  }

  onChangeTipoEmpleado(event: any) {
    if (event.value != null) {
      this.empleado.idTipoEmpleado = Number.parseInt(
        String(event.value['value'])
      );
    } else {
      this.empleado.idTipoEmpleado = null;
    }
  }

  onChangeCategoria(event: any) {
    if (event.value != null) {
      this.empleado.idCategoria = Number.parseInt(String(event.value['value']));
    } else {
      this.empleado.idCategoria = null;
    }
  }

  onChangeTipoContrato(event: any) {
    if (event.value != null) {
      this.empleado.idTipoContrato = Number.parseInt(
        String(event.value['value'])
      );
    } else {
      this.empleado.idTipoContrato = null;
    }
  }

  onChangeCiudad(event: any) {
    if (event.value != null) {
      this.empleado.idCiudad = Number.parseInt(String(event.value['value']));
    } else {
      this.empleado.idCiudad = null;
    }
  }

  onChangeNivelEstudios(event: any) {
    if (event.value != null) {
      this.empleado.idNivelEstudios = Number.parseInt(
        String(event.value['value'])
      );
    } else {
      this.empleado.idNivelEstudios = null;
    }
  }

  onChangeFormaPago(event: any) {
    if (event.value != null) {
      this.empleado.idFormaPago = Number.parseInt(String(event.value['value']));
    } else {
      this.empleado.idFormaPago = null;
    }
  }

  onChangeJornada(event: any) {
    if (event.value != null) {
      this.empleado.idJornada = Number.parseInt(String(event.value['value']));
    } else {
      this.empleado.idJornada = null;
    }
  }

  onChangeDepartamento(event: any) {
    if (event.value != null) {
      this.empleado.idDepartamento = Number.parseInt(
        String(event.value['value'])
      );
    } else {
      this.empleado.idDepartamento = null;
    }
  }

  onChangeClasificacion(event: any) {
    if (event.value != null) {
      this.empleado.idClasificacion = Number.parseInt(
        String(event.value['value'])
      );
    } else {
      this.empleado.idClasificacion = null;
    }
  }

  onChangeNumeroNegocio(event: any) {
    if (event.value != null) {
      this.empleado.idUnidadNegocio = Number.parseInt(
        String(event.value['value'])
      );
    } else {
      this.empleado.idUnidadNegocio = null;
    }
  }
}
