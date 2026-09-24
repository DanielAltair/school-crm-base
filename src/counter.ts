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

import type { Usuario, Rol } from "./interfaces";

export function devuelveAlumno(usuarioDelCentro: Usuario [], id: number): Usuario{
  return usuarioDelCentro.find(usuario => usuario.id === id && usuario.rol === 'alumno')!
}

export function filtrarPorRol(usuarios: Usuario[], rol: Rol, activo:boolean): Usuario[]{
    return usuarios.filter(usuario=> usuario.rol===rol && usuario.activo === activo);
}
 