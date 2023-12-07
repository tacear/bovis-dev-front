import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-catalogos',
  templateUrl: './catalogos.component.html',
  styleUrls: ['./catalogs.component.scss']
})
export class CatalogosComponent implements OnInit {

  catalogos: any[] = [
   /*  {
      catalogo: 'cat_viaticos',
      id: null,
      nombre: 'Viaticos',
      orden: 1,
      nameService: ''
    }, */
    {
      catalogo: 'cat_beneficios',
      id: null,
      nombre: 'Beneficios',
      orden: 1,
      nameService: 'beneficio'
    },
    {
      catalogo: 'cat_categoria',
      id: null,
      nombre: 'Categoria',
      orden: 2,
      nameService: 'categoria'
    },
    {
      catalogo: 'cat_clasificacion',
      id: null,
      nombre: 'Clasificación',
      orden: 3,
      nameService: 'Clasificacion'
    },
    {
      catalogo: 'cat_costos_indirectos_salarios',
      id: null,
      nombre: 'Costos Indirectos Salarios',
      orden: 4,
      nameService: 'CostoIndirectoSalarios'
    },
    {
      catalogo: 'cat_departamento',
      id: null,
      nombre: 'Departamento',
      orden: 5,
      nameService: 'Departamento'
    },
    {
      catalogo: 'cat_documento',
      id: null,
      nombre: 'Documento',
      orden: 6,
      nameService: ''
    },
    {
      catalogo: 'cat_estatus_proyecto',
      id: null,
      nombre: 'Estatus Proyecto',
      orden: 7,
      nameService: 'Estatus'
    },
    {
      catalogo: 'cat_ingreso',
      id: null,
      nombre: 'Ingreso',
      orden: 8,
      nameService: 'Ingreso'
    },
    {
      catalogo: 'cat_nivel_puesto',
      id: null,
      nombre: 'Nivel de Puestos',
      orden: 9,
      nameService: 'NivelPuesto'
    },
    {
      catalogo: 'cat_prestacion',
      id: null,
      nombre: 'Prestación',
      orden: 10,
      nameService: 'Prestacion'
    },
    {
      catalogo: 'cat_puesto',
      id: null,
      nombre: 'Puesto',
      orden: 11,
      nameService: ''
    },
    {
      catalogo: 'cat_rubro_ingreso',
      id: null,
      nombre: 'Rubro ingreso rembomsable, no rembomsable',
      orden: 12,
      nameService: 'RubroIngresoReembolsable'
    },
    {
      catalogo: 'cat_sector',
      id: null,
      nombre: 'Sector',
      orden: 13,
      nameService: 'Sector'
    },
    {
      catalogo: 'cat_cie',
      id: null,
      nombre: 'Tipo Cie',
      orden: 14,
      nameService: 'TipoCie'
    },
    {
      catalogo: 'cat_cta_contable',
      id: null,
      nombre: 'Tipo Cta Contable',
      orden: 15,
      nameService: ''
    },
    {
      catalogo: 'cat_tipo_cuenta',
      id: null,
      nombre: 'Tipo cuenta',
      orden: 16,
      nameService: 'TipoCuenta'
    },
    {
      catalogo: 'cat_tipo_documento',
      id: null,
      nombre: 'Tipo Documento',
      orden: 17,
      nameService: 'TipoDocumento'
    }

  ];

  constructor() { }

  ngOnInit(): void {
  }

  asignarUrlService(nameServise: string){
    localStorage.setItem('nombreService', nameServise)
  }

}
