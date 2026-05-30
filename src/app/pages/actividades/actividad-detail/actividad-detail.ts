import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ActividadService } from '../../../services/actividad.service';
import { DetalleActividadService } from '../../../services/detalle-actividad.service';
import { Actividad } from '../../../models/actividad.model';
import { DetalleActividad } from '../../../models/detalle-actividad.model';

@Component({
  selector: 'app-actividad-detail',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './actividad-detail.html',
  styleUrl: './actividad-detail.scss',
})
export class ActividadDetailComponent implements OnInit {

  actividad: Actividad | null = null;
  detalles: DetalleActividad[] = [];
  loading = true;
  error = '';

  // Formulario inline para nuevo detalle
  showDetalleForm = false;
  nuevoDetalle: DetalleActividad = {
    actividad_id: 0,
    descripcion: '',
    observaciones: '',
  };

  constructor(
    private actividadService: ActividadService,
    private detalleService: DetalleActividadService,
    private route: ActivatedRoute,
    private router: Router
  ) { }

  ngOnInit() {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.loadActividad(+id);
      this.loadDetalles(+id);
    }
  }

  loadActividad(id: number) {
    this.actividadService.getById(id).subscribe({
      next: (data) => {
        this.actividad = data;
        this.loading = false;
      },
      error: (err) => {
        this.error = 'Error al cargar la actividad';
        this.loading = false;
        console.error(err);
      }
    });
  }

  loadDetalles(actividadId: number) {
    this.detalleService.getByActividad(actividadId).subscribe({
      next: (data) => this.detalles = data,
      error: (err) => console.error('Error cargando detalles:', err)
    });
  }

  toggleDetalleForm() {
    this.showDetalleForm = !this.showDetalleForm;
    if (this.showDetalleForm && this.actividad) {
      this.nuevoDetalle.actividad_id = this.actividad.id!;
    }
  }

  saveDetalle() {
    this.detalleService.create(this.nuevoDetalle).subscribe({
      next: () => {
        this.loadDetalles(this.actividad!.id!);
        this.nuevoDetalle = {
          actividad_id: this.actividad!.id!,
          descripcion: '',
          observaciones: '',
        };
        this.showDetalleForm = false;
      },
      error: (err) => console.error('Error al guardar detalle:', err)
    });
  }

  deleteDetalle(id: number) {
    if (confirm('¿Eliminar este detalle?')) {
      this.detalleService.delete(id).subscribe({
        next: () => this.loadDetalles(this.actividad!.id!),
        error: (err) => console.error('Error al eliminar:', err)
      });
    }
  }

  goBack() {
    this.router.navigate(['/main/actividades']);
  }
}
