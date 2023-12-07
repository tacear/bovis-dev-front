// import { NgbDateStruct } from "@ng-bootstrap/ng-bootstrap/datepicker/ngb-date-struct";

export class Empleado {

  id: number;
  nombre: string = '';
  apellido_paterno: string = '';
  apellido_materno: string = '';
  datosContacto: string = '';
  fechaNacimiento: Date;
  edad: number;
  sexo: string = 'Masculino';
  direccion: string = '';
  clave_id_fed: string = '';
  email: string = '';
  telefono: string = '';
  kfc: string = '';
  curp: string = '';
  nss: string = '';
  porcentajeCaptura: number = 35;

}
export interface ICatalogo{
  id: string;
  descripcion: string;
  activo: boolean;
}

export interface ICatalogoCombos {
  name: string;
  value: string;
}

export class Persona{
  IdEdoCivil: number = 0;
  IdTipoSangre: number = 0;
  Nombre: string = '';
  ApPaterno: string = '';
  ApMaterno: string = '';
  Sexo: number = 0;
  Rfc: string = '';
  FechaNacimiento: string = '';
  Email: string = '';
  Telefono: string = '';
  Celular: string = '';
  Curp: string = '';
  TipoPersona: number = 0;
}

export class CatPersona{

  idPersona: number = 0;
  idEdoCivil: number = 0;
  idTipoSangre: number = 0;
  nombre: string = '';
  id: string = '';
  apPaterno: string = '';
  apMaterno: string = '';
  sexo: number = 0;
  //sexo: string = '';
  rfc: string = '';
  fechaNacimiento: string = '';
  email: string = '';
  telefono: string = '';
  celular: string = '';
  curp: string = '';
  activo: boolean = true;
  tipoPersona: number = 0;
}

export class CatPersonaDetalle{

  idPersona: number = 0;
  idEdoCivil: number = 0;
  idTipoSangre: number = 0;
  nombre: string = '';
  apPaterno: string = '';
  apMaterno: string = '';
  sexo: string = '';
  rfc: string = '';
  fechaNacimiento: string = '';
  email: string = '';
  telefono: string = '';
  celular: string = '';
  curp: string = '';
  activo: boolean = true;
  tipoPersona: number = 0;
  edoCivil: string = '';
  tipoSangre: string = '';
}

export class CatEmpleado {

  numEmpleadoRrHh: number = null;
  idPersona: number = null;
  idTipoEmpleado: number = null;
  idCategoria: number = null;
  idTipoContrato: number = null;
  cvePuesto: string = '';
  idEmpresa: number = 0;
  idCiudad: number = null;
  idNivelEstudios: number = null;
  idFormaPago: number = null;
  idJornada: number = null;
  idDepartamento: number = null;
  idClasificacion: number = null;
  idJefeDirecto: number = 0;
  idUnidadNegocio: number = null;
  idTipoContratoSat: number = 0;
  numEmpleado: number = null;
  fechaIngreso: string = '';
  fechaSalida: string = '';;
  fechaUltimoReingreso: string = '';
  nss: number = null;;
  emailBovis: string = '';
  experiencias: string = '';
  habilidades: string = '';
  urlRepositorio: string = '';
  salario: number = null;
  profesion: string = '';
  antiguedad: number = null;
  turno: string = 'M';
  unidadMedica: number = null;
  registroPatronal: string = '';
  cotizacion: string = '';
  duracion: number = null;
  activo: boolean = false;
  descuentoPension: boolean = false;
  porcentajePension: number = null;
  fondoFijo: number = null;
  creditoInfonavit: number = null;
  tipoDescuento: string = '';
  valorDescuento: number = null;
  empleadoNoi: number = null;

}

export class CatEmpleadoDetalle {

  numEmpleadoRrHh: number = null;
  idPersona: number = null;
  cvePuesto: string = '';
  idEmpresa: number = 0;
  activo: boolean = false;
  idTipoEmpleado: number = null;
  idCategoria: number = null;
  idTipoContrato: number = null;
  idCiudad: number = null;
  idNivelEstudios: number = null;
  idFormaPago: number = null;
  idJornada: number = null;
  idDepartamento: number = null;
  idClasificacion: number = null;
  idJefeDirecto: number = 0;
  idUnidadNegocio: number = null;
  idTipoContratoSat: number = 0;
  numEmpleado: number = null;
  fechaIngreso: string = '';
  fechaSalida: string = '';
  fechaUltimoReingreso: string = '';
  nss: number = null;;
  emailBovis: string = '';
  experiencias: string = '';
  habilidades: string = '';
  urlRepositorio: string = '';
  salario: number = null;
  profesion: string = '';
  antiguedad: number = null;
  turno: string = 'M';
  unidadMedica: number = null;
  registroPatronal: string = '';
  cotizacion: string = '';
  duracion: number = null;
  descuentoPension: boolean = false;
  porcentajePension: number = null;
  fondoFijo: number = null;
  creditoInfonavit: number = null;
  tipoDescuento: string = '';
  valorDescuento: number = null;
  empleadoNoi: number = null;
  nombre: string = '';
  apPaterno: string = '';
  apMaterno: string = '';
  idNivel: number = null;
  puesto: string = '';
  empresa: string = '';
  tipoEmpleado: string = '';
  categoria: string = '';
  tipoContrato: string = '';
  ciudad: string = '';
  nivelEstudios: string = '';
  formaPago: string = '';
  jornada: string = '';
  departamento: string = '';
  clasificacion: string = '';
  jefeDirecto:string = '';
  unidadNegocio: string = '';
  tipoContratoSat: string = '';


}

export class CatEmpleadoDetalleExcel {
  numEmpleadoRrHh: number = null;
  nombre: string = '';
  apPaterno: string = '';
  apMaterno: string = '';
  categoria: string = '';
  tipoContrato: string = '';
  cvePuesto: string = '';
  empresa: string = '';
  ciudad: string = '';
  nivelEstudios: string = '';
  formaPago: string = '';
  jornada: string = '';
  departamento: string = '';
  clasificacion: string = '';
  jefeDirecto:string = '';
  unidadNegocio: string = '';
  tipoContratoSat: string = '';
  numEmpleado: number = null;
  fechaIngreso: string = '';
  fechaSalida: string = '';
  fechaUltimoReingreso: string = '';
  nss: number = null;;
  emailBovis: string = '';
  experiencias: string = '';
  habilidades: string = '';
  urlRepositorio: string = '';
  salario: number = null;
  profesion: string = '';
  antiguedad: number = null;
  turno: string = 'M';
  unidadMedica: number = null;
  registroPatronal: string = '';
  cotizacion: string = '';
  duracion: number = null;
  activo: boolean = false;
  descuentoPension: boolean = false;
  porcentajePension: number = null;
  fondoFijo: number = null;
  creditoInfonavit: number = null;
  tipoDescuento: string = '';
  valorDescuento: number = null;
  empleadoNoi: number = null;
}

export interface IEmpresa{
  rfc: string;
  empresa: string;
  idEmpresa: string;
}

export interface ICatPersona{
  nombre: string;
  apPaterno: string;
  apMaterno: string;
  idPersona: string;
}


