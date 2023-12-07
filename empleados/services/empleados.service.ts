import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { CatEmpleado, CatPersona, Persona } from '../Models/empleados';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class EmpleadosService {

  baseUrl = environment.urlApiBovis;

  private httpHeaders = new HttpHeaders(
    { 'Content-Type': 'application/json' }
  )

  constructor(private http: HttpClient) { }

  getEstadoCivil() {
    return this.http.get<any>(`${this.baseUrl}api/catalogo/EstadoCivil/`);
  }

  getTipoSangre() {
    return this.http.get<any>(`${this.baseUrl}api/catalogo/TipoSangre/`);
  }

  getTipoPersona() {
    return this.http.get<any>(`${this.baseUrl}api/catalogo/TipoPersona/`);
  }

  getTipoSexo() {
    return this.http.get<any>(`${this.baseUrl}api/catalogo/Sexo/`);
  }

  getCatPersonas() {
    return this.http.get<any>(`${this.baseUrl}api/empleado/persona/Consultar`);
  }

  getCatEmpleados() {
    return this.http.get<any>(`${this.baseUrl}api/catalogo/TipoEmpleado/`);
  }

  getCatCategorias() {
    return this.http.get<any>(`${this.baseUrl}api/catalogo/categoria/`);
  }

  getCatTiposContratos() {
    return this.http.get<any>(`${this.baseUrl}api/catalogo/TipoContrato/`);
  }

  getCatEmpresas() {
    return this.http.get<any>(`${this.baseUrl}api/pcs/empresas`);
  }

  getCatCiudades() {
    return this.http.get<any>(`${this.baseUrl}api/catalogo/ciudad/`);
  }

  getCatNivelEstudios() {
    return this.http.get<any>(`${this.baseUrl}api/catalogo/NivelEstudios/`);
  }

  getCatFormasPago() {
    return this.http.get<any>(`${this.baseUrl}api/catalogo/FormaPago/`);
  }

  getCatJornadas() {
    return this.http.get<any>(`${this.baseUrl}api/catalogo/Jornada/`);
  }

  getCatDepartamentos() {
    return this.http.get<any>(`${this.baseUrl}api/catalogo/Departamento/`);
  }

  getCatClasificacion() {
    return this.http.get<any>(`${this.baseUrl}api/catalogo/Clasificacion/`);
  }

  getCatUnidadNegocio() {
    return this.http.get<any>(`${this.baseUrl}api/catalogo/UnidadNegocio/`);
  }

  getPersonas() {
    return this.http.get<any>(`${this.baseUrl}api/empleado/persona/Consultar`);
  }

  getPersonasDetalle() {
    return this.http.get<any>(`${this.baseUrl}api/empleado/persona/ConsultarDetalle`);
  }

  savePersona(persona: CatPersona): Observable<any> {
    return this.http.put(`${this.baseUrl}api/empleado/persona/Agregar`, persona, { headers: this.httpHeaders });
  }

  updatePersona(persona: CatPersona): Observable<any> {
    return this.http.post(`${this.baseUrl}api/empleado/persona/actualizar`, persona, { headers: this.httpHeaders });
  }

  getEmpleados() {
    return this.http.get<any>(`${this.baseUrl}api/empleado/Consultar`);
  }

  getEmpleadosDetalle() {
    return this.http.get<any>(`${this.baseUrl}api/empleado/ConsultarDetalle`);
  }

  saveEmpleado(empleado: CatEmpleado): Observable<any> {
    console.log(empleado);
    return this.http.put(`${this.baseUrl}api/empleado/Agregar`, empleado, { headers: this.httpHeaders });
  }

}
