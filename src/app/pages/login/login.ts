import { Component } from '@angular/core';
import { AuthService } from '../../services/auth';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './login.html',
  styleUrl: './login.scss',
})
export class LoginComponent {

  email = '';
  password = '';

  constructor(
    private authService: AuthService,
    private router: Router
  ) { }

  login() {

    const data = {
      correo: this.email,
      password: this.password
    };

    console.log("Correo: " + this.email);

    this.authService.login(data).subscribe({
      next: (res) => {

        // ✔️ ahora el servicio maneja el storage
        this.authService.saveSession(res.token, res.roles, res.user);

        console.log("RESPUESTA COMPLETA LOGIN:", res);

        console.log("TOKEN:", res.token);
        console.log("ROLES:", res.roles);
        console.log("ROLES:", res.user);

        // ✔️ redirección
        this.router.navigate(['main']);
      },

      error: (err) => {
        console.error('Error login', err);
      }
    });
  }
}