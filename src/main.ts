import { devuelveAlumno, filtrarPorRol } from './counter';
import { CRMController } from './controllers/crm.controller';

const crm = new CRMController();
const usuarioDelCentro = crm.obtenerUsuarios();

const profesoresActivos = filtrarPorRol(usuarioDelCentro, 'profesor', true);
console.log('Profesores disponibles hoy:', profesoresActivos);

const alumnosActivos = filtrarPorRol(usuarioDelCentro, 'alumno', true);
console.log('Alumnos disponibles hoy:', alumnosActivos);

console.log('Devuelve alumno con id 1:', devuelveAlumno(usuarioDelCentro, 1));

