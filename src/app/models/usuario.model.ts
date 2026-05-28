import { Rol } from './rol.model';

export interface Usuario {
  id?: number;
  nombre: string;
  correo: string;
  password?: string;
  rol_id: number;
  rol?: Rol;
  created_at?: string;
}
