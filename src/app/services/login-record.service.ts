import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../core/environments/environment';
import { LoginRecord } from '../models/login-record.model';

@Injectable({ providedIn: 'root' })
export class LoginRecordService {

  private url = `${environment.apiUrl}/loginrecords`;

  constructor(private http: HttpClient) {}

  getAll(): Observable<LoginRecord[]> {
    return this.http.get<LoginRecord[]>(this.url);
  }

  getByUsuario(usuarioId: number): Observable<LoginRecord[]> {
    return this.http.get<LoginRecord[]>(`${this.url}/usuario/${usuarioId}`);
  }
}
