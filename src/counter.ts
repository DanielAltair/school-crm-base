/* export function setupCounter(element: HTMLButtonElement) {
  let counter = 0
  const setCounter = (count: number) => {
    counter = count
    element.innerHTML = `Count is ${counter}`
  }
  element.addEventListener('click', () => setCounter(counter + 1))
  setCounter(0)
}
 */
import type { Usuario, RolUsuario } from './models/interfaces.ts';

export function filtrarUsuariosPorRol(usuarios: Usuario[], rol: RolUsuario): Usuario[] {
    return usuarios.filter(usuario => usuario.rol === rol);
}

export function devuelveAlumno(usuariosDelCentro: Usuario[], id: string): Usuario | undefined {
  return usuariosDelCentro.find(usuario => usuario.id === id && usuario.rol === 'alumno');
}
