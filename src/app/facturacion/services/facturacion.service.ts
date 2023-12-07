import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Busqueda, CargaFile, FacrurasNC, InfoProyectoFacturas, LstFacturas, facturaCancelacion } from '../Models/FacturacionModels';


@Injectable({
  providedIn: 'root'
})
export class FacturacionService {

  baseUrl = environment.urlApiBovis;

  private httpHeaders = new HttpHeaders(
    { 'Content-Type': 'application/json' }
  )

  constructor(private http: HttpClient) { }

  cargaXML(procesaFactura: InfoProyectoFacturas): Observable<any> {
    //console.log(procesaFactura);
    return this.http.put(`${this.baseUrl}api/Factura/agregar`, procesaFactura, { headers: this.httpHeaders });
  }

  getInfoProyecto(numProyecto: number): Observable<any> {
    return this.http.get(`${this.baseUrl}api/Factura/infoproyecto/${numProyecto}`,);
  }

  cargaXMLNC(procesaFactura: FacrurasNC): Observable<any> {
    console.log(procesaFactura);
    //return null;
    return this.http.put(`${this.baseUrl}api/Factura/AgregarNC`, procesaFactura, { headers: this.httpHeaders });
  }

  cargaXML_CRP(procesaFactura: FacrurasNC): Observable<any> {
    console.log(procesaFactura);
    //return null;
    return this.http.put(`${this.baseUrl}api/Factura/AgregarCRP`, procesaFactura, { headers: this.httpHeaders });
  }

  getBusqueda(objBusqueda: Busqueda) {
    return this.http.post<any>(`${this.baseUrl}api/factura/consultar`,objBusqueda, { headers: this.httpHeaders });
  }

  getProyectos() {
    return this.http.get<any>(`${this.baseUrl}api/pcs/proyectos/`);
  }

  getEmpresas() {
    return this.http.get<any>(`${this.baseUrl}api/pcs/empresas`);
  }

  getClientes() {
    return this.http.get<any>(`${this.baseUrl}api/pcs/clientes`);
  }

  facturaCancelacion(cancelacion: facturaCancelacion) {
    return this.http.post<any>(`${this.baseUrl}api/factura/cancelar`,cancelacion, { headers: this.httpHeaders });
  }

}
