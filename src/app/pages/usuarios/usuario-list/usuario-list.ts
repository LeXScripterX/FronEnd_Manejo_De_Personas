import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { UsuarioService } from '../../../services/usuario.service';
import { Usuario } from '../../../models/usuario.model';

@Component({
  selector: 'app-usuario-list',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './usuario-list.html',
  styleUrl: './usuario-list.scss',
})
export class UsuarioListComponent implements OnInit {

  usuarios: Usuario[] = [];
  loading = true;
  error = '';

  constructor(private usuarioService: UsuarioService) {}

  ngOnInit() {
    this.loadUsuarios();
  }

  loadUsuarios() {
    this.loading = true;
    this.usuarioService.getAll().subscribe({
      next: (data) => {
        this.usuarios = data;
        this.loading = false;
      },
      error: (err) => {
        this.error = 'Error al cargar los usuarios';
        this.loading = false;
        console.error(err);
      }
    });
  }

  deleteUsuario(id: number) {
    if (confirm('¿Estás seguro de eliminar este usuario?')) {
      this.usuarioService.delete(id).subscribe({
        next: () => this.loadUsuarios(),
        error: (err) => console.error('Error al eliminar:', err)
      });
    }
  }
}
