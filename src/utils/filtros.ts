import type { Usuario } from '../interfaces.ts';

// Exportamos la función pura de filtrado 
export function obtenerUsuariosPorRol(lista: Usuario[], rolBuscado: 'profesor' | 'alumno'): Usuario[] { 
  return lista.filter(usuario => usuario.rol === rolBuscado);
}