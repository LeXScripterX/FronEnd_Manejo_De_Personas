import { Usuario } from './usuario.model';
import { DetalleActividad } from './detalle-actividad.model';

export interface Actividad {
  id?: number;
  titulo: string;
  descripcion: string;
  estado: 'PENDIENTE' | 'EN_PROGRESO' | 'COMPLETADA' | 'CANCELADA';
  usuario_id: number;
  usuario?: Usuario;
  detalles?: DetalleActividad[];
  fecha_inicio?: string;
  fecha_fin?: string;
}
