import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private apiUrl = environment.apiUrl;

  constructor(private http: HttpClient) { }

  login(data: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/login`, data);
  }

  register(data: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/register`, data);
  }

  // 🔐 Guardar sesión
  saveSession(token: string, roles: any, user: string) {
    localStorage.setItem('token', token);
    localStorage.setItem('roles', JSON.stringify(roles));
    localStorage.setItem('user', user);
  }

  // 🔍 Obtener token
  getToken(): string | null {
    return localStorage.getItem('token');
  }

  getroles(): string | null {
    return localStorage.getItem('roles');
  }

  getuser(): string | null {
    return localStorage.getItem('user');
  }


  // 🚪 Logout
  logout() {
    localStorage.removeItem('token');
    localStorage.removeItem('roles');
  }

  // ✔️ Verificar login
  isLoggedIn(): boolean {
    return !!this.getToken();
  }
}