import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../core/environments/environment';
import { Actividad } from '../models/actividad.model';

@Injectable({ providedIn: 'root' })
export class ActividadService {

  private url = `${environment.apiUrl}/actividades`;

  constructor(private http: HttpClient) {}

  getAll(): Observable<Actividad[]> {
    return this.http.get<Actividad[]>(this.url);
  }

  getById(id: number): Observable<Actividad> {
    return this.http.get<Actividad>(`${this.url}/${id}`);
  }

  getByUsuario(usuarioId: number): Observable<Actividad[]> {
    return this.http.get<Actividad[]>(`${this.url}/usuario/${usuarioId}`);
  }

  create(actividad: Actividad): Observable<Actividad> {
    return this.http.post<Actividad>(this.url, actividad);
  }

  update(id: number, actividad: Actividad): Observable<Actividad> {
    return this.http.put<Actividad>(`${this.url}/${id}`, actividad);
  }

  delete(id: number): Observable<void> {
    return this.http.delete<void>(`${this.url}/${id}`);
  }
}
