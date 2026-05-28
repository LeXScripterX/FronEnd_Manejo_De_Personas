import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../core/environments/environment';
import { DetalleActividad } from '../models/detalle-actividad.model';

@Injectable({ providedIn: 'root' })
export class DetalleActividadService {

  private url = `${environment.apiUrl}/detalle-actividad`;

  constructor(private http: HttpClient) {}

  getByActividad(actividadId: number): Observable<DetalleActividad[]> {
    return this.http.get<DetalleActividad[]>(`${this.url}/actividad/${actividadId}`);
  }

  getById(id: number): Observable<DetalleActividad> {
    return this.http.get<DetalleActividad>(`${this.url}/${id}`);
  }

  create(detalle: DetalleActividad): Observable<DetalleActividad> {
    return this.http.post<DetalleActividad>(this.url, detalle);
  }

  update(id: number, detalle: DetalleActividad): Observable<DetalleActividad> {
    return this.http.put<DetalleActividad>(`${this.url}/${id}`, detalle);
  }

  delete(id: number): Observable<void> {
    return this.http.delete<void>(`${this.url}/${id}`);
  }
}
