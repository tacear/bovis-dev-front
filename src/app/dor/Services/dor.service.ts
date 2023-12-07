import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Objetivos } from '../Models/subordinados';

@Injectable({
  providedIn: 'root'
})
export class DorService {

  baseUrl = environment.urlApiBovis;
  private httpHeaders = new HttpHeaders(
    { 'Content-Type': 'application/json' }
  )

  constructor(private http: HttpClient) { }

  getDatosEjecutivo(userMail: string | null): Observable<Object>{

    let mail = `{"email":"${userMail}"}`;
    return this.http.post<Object>(`${this.baseUrl}api/Dor/DatosEjecutivo`,mail, { headers: this.httpHeaders });
  }

  getDatosSubordinados(name: string): Observable<any> {
    let user = `{"nombre":"${name}"}`;
    //console.log(user);
    return this.http.post(`${this.baseUrl}api/DOR/ListaSubordinados`, user, { headers: this.httpHeaders });
  }

  getObjetivosByProyecto(anio: string, numProyecto: string, noEmpleado: string, nivel: string, tipo: number) {

    return this.http.get<any>(`${this.baseUrl}api/DOR/ConsultarObjetivosProyecto/${anio}/${numProyecto}/${noEmpleado}/${nivel}/${tipo}`);
  }

  getObjetivosGenerales(nivel: string, unidad: string) {
    //console.log(nivel);
    return this.http.get<any>(`${this.baseUrl}api/DOR/ConsultarObjetivosGenerales/${nivel}/${unidad}`);
  }

  updateObjetivos(objetivo: Objetivos): Observable<any> {
    //console.log(objetivo);
    return this.http.put(`${this.baseUrl}api/dor/ActualizarObjetivos`, objetivo, { headers: this.httpHeaders });
  }


  getDatosEmpleado(userMail: string | null) {
    let mail = `{"email":"${userMail}"}`;
    return this.http.post<any>(`${this.baseUrl}api/dor/DatosEmpleado`,mail, { headers: this.httpHeaders });
  }

  // getConsultarGPM(proyecto: string | null) {
  //   return this.http.get<any>(`${this.baseUrl}api/dor/ConsultarGPM/${proyecto}`);
  // }

  getConsultarMetasProyecto(proyecto: string | null,nivel: string | null) {
    return this.http.get<any>(`${this.baseUrl}api/dor/ConsultarMetas/${proyecto}/${nivel}`);
  }


}
