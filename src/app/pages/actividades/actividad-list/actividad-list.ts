import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { ActividadService } from '../../../services/actividad.service';
import { Actividad } from '../../../models/actividad.model';

@Component({
  selector: 'app-actividad-list',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './actividad-list.html',
  styleUrl: './actividad-list.scss',
})
export class ActividadListComponent implements OnInit {

  actividades: Actividad[] = [];
  loading = true;
  error = '';

  constructor(private actividadService: ActividadService) {}

  ngOnInit() {
    this.loadActividades();
  }

  loadActividades() {
    this.loading = true;
    this.actividadService.getAll().subscribe({
      next: (data) => {
        this.actividades = data;
        this.loading = false;
      },
      error: (err) => {
        this.error = 'Error al cargar las actividades';
        this.loading = false;
        console.error(err);
      }
    });
  }

  deleteActividad(id: number) {
    if (confirm('¿Estás seguro de eliminar esta actividad?')) {
      this.actividadService.delete(id).subscribe({
        next: () => this.loadActividades(),
        error: (err) => console.error('Error al eliminar:', err)
      });
    }
  }

  getEstadoClass(estado: string): string {
    const map: Record<string, string> = {
      'PENDIENTE': 'badge-warning',
      'EN_PROGRESO': 'badge-info',
      'COMPLETADA': 'badge-success',
      'CANCELADA': 'badge-danger',
    };
    return map[estado] || '';
  }
}
