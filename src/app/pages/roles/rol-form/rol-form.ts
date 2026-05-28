import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { RolService } from '../../../services/rol.service';
import { Rol } from '../../../models/rol.model';

@Component({
  selector: 'app-rol-form',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './rol-form.html',
  styleUrl: './rol-form.scss',
})
export class RolFormComponent implements OnInit {

  rol: Rol = { nombre: '', descripcion: '' };
  isEdit = false;
  rolId: number | null = null;
  loading = false;
  error = '';

  constructor(
    private rolService: RolService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit() {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.isEdit = true;
      this.rolId = +id;
      this.loadRol(this.rolId);
    }
  }

  loadRol(id: number) {
    this.loading = true;
    this.rolService.getById(id).subscribe({
      next: (data) => {
        this.rol = data;
        this.loading = false;
      },
      error: (err) => {
        this.error = 'Error al cargar el rol';
        this.loading = false;
        console.error(err);
      }
    });
  }

  save() {
    this.loading = true;
    const request = this.isEdit
      ? this.rolService.update(this.rolId!, this.rol)
      : this.rolService.create(this.rol);

    request.subscribe({
      next: () => {
        this.router.navigate(['/main/roles']);
      },
      error: (err) => {
        this.error = 'Error al guardar el rol';
        this.loading = false;
        console.error(err);
      }
    });
  }

  cancel() {
    this.router.navigate(['/main/roles']);
  }
}
