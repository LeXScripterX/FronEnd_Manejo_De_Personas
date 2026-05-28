import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { RolService } from '../../../services/rol.service';
import { Rol } from '../../../models/rol.model';

@Component({
  selector: 'app-rol-list',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './rol-list.html',
  styleUrl: './rol-list.scss',
})
export class RolListComponent implements OnInit {

  roles: Rol[] = [];
  loading = true;
  error = '';

  constructor(private rolService: RolService) {}

  ngOnInit() {
    this.loadRoles();
  }

  loadRoles() {
    this.loading = true;
    this.rolService.getAll().subscribe({
      next: (data) => {
        this.roles = data;
        this.loading = false;
      },
      error: (err) => {
        this.error = 'Error al cargar los roles';
        this.loading = false;
        console.error(err);
      }
    });
  }

  deleteRol(id: number) {
    if (confirm('¿Estás seguro de eliminar este rol?')) {
      this.rolService.delete(id).subscribe({
        next: () => this.loadRoles(),
        error: (err) => console.error('Error al eliminar:', err)
      });
    }
  }
}
