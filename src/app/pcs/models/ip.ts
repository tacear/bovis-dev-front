export interface ICatalogo{
  id: string;
  descripcion: string;
  activo: boolean;
}

export interface ICatalogoCombos {
  name: string;
  value: string;
}

export interface ICatalogoCliente{
  idCliente: string;
  rfc: string;
  cliente: boolean;
}

export interface IEmpleado{
  numEmpleadoRrHh: number;
  idPersona: number;
  cvePuesto: string;
  idEmpresa: number;
  activo: boolean;
  nombre: string;
  apPaterno: string;
  apMaterno: string;
  idNivel: number;
  puesto: string;
  empresa: string;
}
