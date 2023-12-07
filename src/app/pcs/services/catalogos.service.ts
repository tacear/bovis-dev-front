import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class CatalogosService {
  baseUrl = environment.urlApiBovis;

  constructor(private http: HttpClient) { }

  getSectores() {
    return this.http.get<any>(`${this.baseUrl}api/catalogo/Sector/`);
  }

  getPais() {
    return this.http.get<any>(`${this.baseUrl}api/catalogo/pais/`);
  }

  getEstatusProyecto() {
    return this.http.get<any>(`${this.baseUrl}api/catalogo/Estatus/`);
  }

  getClientes() {
    return this.http.get<any>(`${this.baseUrl}api/pcs/clientes`);
  }

  getEmpleados() {
    return this.http.get<any>(`${this.baseUrl}api/empleado/ConsultarDetalle`);
  }


}
