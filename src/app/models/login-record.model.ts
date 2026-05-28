import { Usuario } from './usuario.model';

export interface LoginRecord {
  id?: number;
  usuario_id: number;
  usuario?: Usuario;
  fecha_login: string;
  ip_address?: string;
  user_agent?: string;
}
