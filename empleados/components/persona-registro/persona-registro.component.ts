import { Component, OnInit } from '@angular/core';
import { Message, MessageService, PrimeNGConfig } from 'primeng/api';
import { CatPersona, ICatalogo, ICatalogoCombos, Persona } from '../../Models/empleados';
import { EmpleadosService } from '../../services/empleados.service';
import { ActivatedRoute, Router } from '@angular/router';



@Component({
  selector: 'app-persona-registro',
  templateUrl: './persona-registro.component.html',
  styleUrls: ['./persona-registro.component.css'],
})

export class PersonaRegistroComponent implements OnInit {
  isConsulta: boolean = false;
  isConsultaButons: boolean = false;
  listEstadoCivil: Array<ICatalogo> = [];
  listTipoSangre: Array<ICatalogo> = [];
  listTipoPersona: Array<ICatalogo> = [];
  listSexo: Array<ICatalogo> = [];
  catEstadoCivil: ICatalogoCombos[] = [];
  catTipoSangre: ICatalogoCombos[] = [];
  catTipoPersona: ICatalogoCombos[] = [];
  catSexo: ICatalogoCombos[] = [];
  fechaNacimiento: Date;
  persona: CatPersona = new CatPersona();
  messages1: Message[];
  isCamposRequeridos = false;
  mensajeCamposRequeridos: string = '';
  idPersona: number;
  sEstadoCivil: ICatalogoCombos;
  sTipoSangre: ICatalogoCombos;
  sSexo: ICatalogoCombos;
  sTipoPersona: ICatalogoCombos;

  constructor(
    private empleadosServ: EmpleadosService,
    private config: PrimeNGConfig,
    private messageService: MessageService,
    private router: Router,
    private route: ActivatedRoute
  ) { }

  ngOnInit(): void {
    this.getConfigCalendar();
    this.getEstadoCivil();
    this.getTipoSangre();
    this.getTipoPersona();
    this.getCatSexo();

    this.route.paramMap.subscribe(paramMap => {
      //console.log(paramMap.get('id'));
      if (paramMap.get('id') != null) {
        this.idPersona = Number(paramMap.get('id').toString());
        this.getPersonas();
      } else {
        this.idPersona = null;
      }
    });
  }

  getPersonas() {
    this.empleadosServ.getPersonas().subscribe(per => {
      let listPersonas: Array<CatPersona> = per.data;
      this.persona = listPersonas.find(xx => xx.idPersona == this.idPersona);
      console.log(this.persona);
      this.sEstadoCivil = this.catEstadoCivil.find((xx => Number(xx.value) == this.persona.idEdoCivil));
      this.sTipoSangre = this.catTipoSangre.find((xx => Number(xx.value) == this.persona.idTipoSangre));
      //console.log(this.persona.Sexo);
      console.log(this.persona.sexo);
      //this.sSexo = this.catSexo.find((xx => xx.name == this.persona.sexo));
      this.sSexo = this.catSexo.find((xx =>  Number(xx.value) == this.persona.sexo));
      console.log("verificando");
      console.log(this.sSexo);
      this.sTipoPersona = this.catTipoPersona.find((xx => Number(xx.value) == this.persona.tipoPersona));
      this.fechaNacimiento = new Date(this.persona.fechaNacimiento);
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

  getEstadoCivil() {
    this.listEstadoCivil = [];
    this.empleadosServ.getEstadoCivil().subscribe((data) => {
      //console.log(data);
      if (data.success) {
        this.listEstadoCivil = <ICatalogo[]>data['data'];
        this.listEstadoCivil.forEach((element) => {
          this.catEstadoCivil.push({
            name: String(element.descripcion),
            value: String(element.id),
          });
        });
      }
    });
  }

  getTipoSangre() {
    this.listEstadoCivil = [];
    this.empleadosServ.getTipoSangre().subscribe((data) => {
      if (data.success) {
        this.listTipoSangre = <ICatalogo[]>data['data'];

        this.listTipoSangre.forEach((element) => {
          this.catTipoSangre.push({
            name: String(element.descripcion),
            value: String(element.id),
          });
        });
      }
    });
  }

  getTipoPersona() {
    this.listEstadoCivil = [];
    this.empleadosServ.getTipoPersona().subscribe((data) => {
      if (data.success) {
        this.listTipoPersona = <ICatalogo[]>data['data'];

        this.listTipoPersona.forEach((element) => {
          this.catTipoPersona.push({
            name: String(element.descripcion),
            value: String(element.id),
          });
        });
      }
    });
  }

  getCatSexo() {
    this.listSexo = [];
    this.empleadosServ.getTipoSexo().subscribe((data) => {
      if (data.success) {
        this.listSexo = <ICatalogo[]>data['data'];

        this.listSexo.forEach((element) => {
          this.catSexo.push({
            name: String(element.descripcion),
            value: String(element.id),
          });
        });
      }
    });
  }

  onChangeComboEdoCivil(event: any) {
    /* console.log('event :' + event);
    console.log(event.value); */
    if (event.value != null) {
      this.persona.idEdoCivil = Number.parseInt(String(event.value['value']));
    } else {
      this.persona.idEdoCivil = 0;
    }
    //console.log(this.persona);
  }

  onChangeComboTipoSangre(event: any) {
    if (event.value != null) {
      this.persona.idTipoSangre = Number.parseInt(String(event.value['value']));
    } else {
      this.persona.idTipoSangre = 0;
    }
  }

  onChangeComboSexo(event: any) {
    if (event.value != null) {
      this.persona.sexo = Number.parseInt(String(event.value['value']));
    } else {
      this.persona.sexo = 0;
    }
  }

  onChangeComboTipoPersona(event: any) {
    if (event.value != null) {
      this.persona.tipoPersona = Number.parseInt(String(event.value['value']));
    } else {
      this.persona.tipoPersona = 0;
    }
  }

  clearData() {
    this.persona = new CatPersona();
    this.fechaNacimiento = null;
    this.mensajeCamposRequeridos = '';
    this.isCamposRequeridos = false;
  }

  guardar() {
    /* console.log(this.persona);
    console.log(this.fechaNacimiento);
    console.log(this.fechaNacimiento.toJSON().slice(0, 10).replace(/-/g, '-')); */
    this.camposRequeridos();
    if (this.mensajeCamposRequeridos == '') {
      this.isCamposRequeridos = false;
      this.persona.fechaNacimiento = this.fechaNacimiento.toJSON().slice(0, 10).replace(/-/g, '-');
      //Editar
      if (this.idPersona != null) {
        this.empleadosServ.updatePersona(this.persona).subscribe({
          next: (data) => {
            //console.log(data);
            if (data.success) {

              this.messageService.add({
                severity: "success",
                summary: "Persona",
                detail: "Registro actualizado correctamente",
                life: 2000
              });
              setTimeout(
                () => {
                  this.router.navigate(['/empleados', 'persona']);
                }, 1500);
            } else {
              console.log(data);
              //this.menssageError(error);
            }
          },
          error: (e) => {
            //console.log(e);
            let error = `${e.message} \n\n ${e.error}`
            this.menssageError(error);
          }
        });
      }
      else { //Nuevo
        this.empleadosServ.savePersona(this.persona).subscribe({
          next: (data) => {
            //console.log(data);
            if (data.success) {

              this.messageService.add({
                severity: "success",
                summary: "Persona",
                detail: "Registro guardado correctamente",
                life: 2000
              });
              setTimeout(
                () => {
                  this.router.navigate(['/empleados', 'persona']);
                }, 1500);
            } else {
              console.log(data);
              //this.menssageError(error);
            }
          },
          error: (e) => {
            //console.log(e);
            let error = `${e.message} \n\n ${e.error}`
            this.menssageError(error);
          }
        });
      }
    }
    else {
      this.isCamposRequeridos = true;
      this.messages1 = [
        { severity: 'error', summary: 'Campos requeridos', detail: this.mensajeCamposRequeridos },
      ];
    }
  }

  menssageError(mensaje: string) {
    this.messageService.add({
      severity: "error",
      summary: "Error",
      detail: mensaje,
      life: 4000
    });
  }

  camposRequeridos() {
    this.mensajeCamposRequeridos = '';
    this.persona.nombre == ''
      ? (this.mensajeCamposRequeridos += 'Nombre, ')
      : '';
    this.persona.sexo == 0
      ? (this.mensajeCamposRequeridos += 'Sexo, ')
      : '';
    this.persona.tipoPersona == 0
      ? (this.mensajeCamposRequeridos += 'Tipo de persona, ')
      : '';
    this.fechaNacimiento == undefined
      ? (this.mensajeCamposRequeridos += 'Fecha de Nacimiento, ')
      : '';
  }

}
