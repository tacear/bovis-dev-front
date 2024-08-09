// Generated by https://quicktype.io

export interface EtapasPorProyectoResponse {
    data:          EtapasPorProyectoData;
    success:       boolean;
    message:       null;
    transactionId: null;
}

export interface EtapasPorProyectoData {
    numProyecto: number;
    fechaIni:    string;
    fechaFin:    string;
    etapas:      Etapa[];
}

export interface Etapa {
    idFase:    number;
    orden:     number;
    fase:      string;
    fechaIni:  string;
    fechaFin:  string;
    empleados: Empleado[];
}

export interface Empleado {
    id:              number;
    idFase:          number;
    numempleadoRrHh: number;
    empleado:        string;
    fechas:          Fecha[];
}

export interface Fecha {
    id:         number;
    mes:        number;
    anio:       number;
    porcentaje: number;
}

export interface ProyectoPorIDResponse {
    data:          Proyecto[];
    success:       boolean;
    message:       null;
    transactionId: null;
}

export interface Proyecto {
    nunum_proyecto:                   number;
    chproyecto:                       string;
    chalcance:                        string;
    chcp:                             string;
    chciudad:                         string;
    nukidpais:                        number;
    chpais:                           string;
    nukidestatus:                     number;
    chestatus:                        string;
    nukidsector:                      number;
    chsector:                         string;
    nukidtipo_proyecto:               number;
    chtipo_proyecto:                  string;
    nukidresponsable_preconstruccion: number | null;
    chresponsable_preconstruccion:    string | null;
    nukidresponsable_construccion:    number | null;
    chresponsable_construccion:       string | null;
    nukidresponsable_ehs:             number | null;
    chresponsable_ehs:                string | null;
    nukidresponsable_supervisor:      number | null;
    chresponsable_supervisor:         string | null;
    nukidcliente:                     number;
    chcliente:                        string;
    nukidempresa:                     number;
    chempresa:                        string;
    nukiddirector_ejecutivo:          number;
    chdirector_ejecutivo:             string;
    nucosto_promedio_m2:              number;
    dtfecha_ini:                      string;
    dtfecha_fin:                      string | null;
    nunum_empleado_rr_hh:             null;
    empleado:                         null;
    nuporcantaje_participacion:       null;
    chalias_puesto:                   null;
    chgrupo_proyecto:                 null;
}

export interface GastoSeccion {
    codigo:     string,
    seccion:    string,
    rubros:     string[]
}