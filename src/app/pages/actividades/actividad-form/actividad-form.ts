import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ActividadService } from '../../../services/actividad.service';
import { UsuarioService } from '../../../services/usuario.service';
import { Actividad } from '../../../models/actividad.model';
import { Usuario } from '../../../models/usuario.model';

@Component({
  selector: 'app-actividad-form',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './actividad-form.html',
  styleUrl: './actividad-form.scss',
})
export class ActividadFormComponent implements OnInit {

  actividad: Actividad = {
    titulo: '',
    descripcion: '',
    estado: 'PENDIENTE',
    usuario_id: 0,
  };

  usuarios: Usuario[] = [];
  isEdit = false;
  actividadId: number | null = null;
  loading = false;
  error = '';

  estados = ['PENDIENTE', 'EN_PROGRESO', 'COMPLETADA', 'CANCELADA'];

  constructor(
    private actividadService: ActividadService,
    private usuarioService: UsuarioService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit() {
    this.loadUsuarios();

    const editId = this.route.snapshot.queryParamMap.get('edit');
    if (editId) {
      this.isEdit = true;
      this.actividadId = +editId;
      this.loadActividad(this.actividadId);
    }
  }

  loadUsuarios() {
    this.usuarioService.getAll().subscribe({
      next: (data) => this.usuarios = data,
      error: (err) => console.error('Error cargando usuarios:', err)
    });
  }

  loadActividad(id: number) {
    this.loading = true;
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

  save() {
    this.loading = true;
    const request = this.isEdit
      ? this.actividadService.update(this.actividadId!, this.actividad)
      : this.actividadService.create(this.actividad);

    request.subscribe({
      next: () => {
        this.router.navigate(['/main/actividades']);
      },
      error: (err) => {
        this.error = 'Error al guardar la actividad';
        this.loading = false;
        console.error(err);
      }
    });
  }

  cancel() {
    this.router.navigate(['/main/actividades']);
  }
}
