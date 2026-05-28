import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../core/environments/environment';
import { Rol } from '../models/rol.model';

@Injectable({ providedIn: 'root' })
export class RolService {

  private url = `${environment.apiUrl}/roles`;

  constructor(private http: HttpClient) {}

  getAll(): Observable<Rol[]> {
    return this.http.get<Rol[]>(this.url);
  }

  getById(id: number): Observable<Rol> {
    return this.http.get<Rol>(`${this.url}/${id}`);
  }

  create(rol: Rol): Observable<Rol> {
    return this.http.post<Rol>(this.url, rol);
  }

  update(id: number, rol: Rol): Observable<Rol> {
    return this.http.put<Rol>(`${this.url}/${id}`, rol);
  }

  delete(id: number): Observable<void> {
    return this.http.delete<void>(`${this.url}/${id}`);
  }
}
