// Generated by https://quicktype.io

export interface CostosEmpleadoResponse {
  data:          CostoEmpleado[];
  success:       boolean;
  message:       null;
  transactionId: null;
}

export interface CostoEmpleado {
  idCosto:                        number;
  numEmpleadoRrHh:                string;
  nuAnno:                         number;
  nuMes:                          number;
  numEmpleadoNoi:                 number;
  idpersona:                      number;
  nombrePersona:                  number;
  reubicacion:                    string;
  idpuesto:                       number;
  puesto:                         string;
  numProyecto:                    number;
  proyecto:                       string;
  idUnidadNegocio:                number;
  unidadNegocio:                  string;
  idEmpresa:                      number;
  Empresa:                        string;
  timesheet:                      string;
  idEmpleadoJefe:                 string;
  nombreJefe:                     string;
  fechaIngreso:                   string;
  antiguedad:                     number;
  avgDescuentoEmpleado:           number;
  montoDescuentoMensual:          number;
  sueldoNetoPercibidoMensual:     number;
  retencionImss:                  number;
  ispt:                           number;
  sueldoBrutoInflacion:           number;
  anual:                          number;
  aguinaldoCantMeses:             number;
  aguinaldoMontoProvisionMensual: number;
  pvDiasVacasAnuales:             number;
  pvProvisionMensual:             number;
  indemProvisionMensual:          number;
  avgBonoAnualEstimado:           number;
  bonoAnualProvisionMensual:      number;
  sgmmCostoTotalAnual:            number;
  sgmmCostoMensual:               number;
  svCostoTotalAnual:              number;
  svCostoMensual:                 number;
  vaidCostoMensual:               number;
  vaidComisionCostoMensual:       number;
  ptuProvision:                   number;
  beneficios:                     null;
  impuesto3sNomina:               number;
  imss:                           number;
  retiro2:                        number;
  cesantesVejez:                  number;
  infonavit:                      number;
  cargasSociales:                 number;
  costoMensualEmpleado:           number;
  costoMensualProyecto:           number;
  costoAnualEmpleado:             number;
  indiceCostoLaboral:             number;
  indiceCargaLaboral:             number;
  fechaActualizacion:             string;
  regHistorico:                   boolean;
  ciudad:                         string;
  costoSalarioBruto:              number;
  costoSalarioNeto:               number;
  empresa:                        string;
  aguinaldoCantidadMeses:         number;
  
}

