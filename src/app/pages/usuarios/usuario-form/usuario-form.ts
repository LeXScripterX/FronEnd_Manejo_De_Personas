import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { UsuarioService } from '../../../services/usuario.service';
import { RolService } from '../../../services/rol.service';
import { Usuario } from '../../../models/usuario.model';
import { Rol } from '../../../models/rol.model';

@Component({
  selector: 'app-usuario-form',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './usuario-form.html',
  styleUrl: './usuario-form.scss',
})
export class UsuarioFormComponent implements OnInit {

  usuario: Usuario = { nombre: '', correo: '', password: '', rol_id: 0 };
  roles: Rol[] = [];
  isEdit = false;
  usuarioId: number | null = null;
  loading = false;
  error = '';

  constructor(
    private usuarioService: UsuarioService,
    private rolService: RolService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit() {
    this.loadRoles();

    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.isEdit = true;
      this.usuarioId = +id;
      this.loadUsuario(this.usuarioId);
    }
  }

  loadRoles() {
    this.rolService.getAll().subscribe({
      next: (data) => this.roles = data,
      error: (err) => console.error('Error cargando roles:', err)
    });
  }

  loadUsuario(id: number) {
    this.loading = true;
    this.usuarioService.getById(id).subscribe({
      next: (data) => {
        this.usuario = data;
        this.loading = false;
      },
      error: (err) => {
        this.error = 'Error al cargar el usuario';
        this.loading = false;
        console.error(err);
      }
    });
  }

  save() {
    this.loading = true;
    const request = this.isEdit
      ? this.usuarioService.update(this.usuarioId!, this.usuario)
      : this.usuarioService.create(this.usuario);

    request.subscribe({
      next: () => {
        this.router.navigate(['/main/usuarios']);
      },
      error: (err) => {
        this.error = 'Error al guardar el usuario';
        this.loading = false;
        console.error(err);
      }
    });
  }

  cancel() {
    this.router.navigate(['/main/usuarios']);
  }
}
