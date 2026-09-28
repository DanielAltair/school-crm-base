import { CRMController } from './controllers/crm.controller';
import type { Usuario } from './models/interfaces';

// Instanciamos el motor (creamos el objeto en memoria)
const miEscuelaCRM = new CRMController("1.0.0");

async function agregarUsuarioAsync(usuario: Usuario): Promise<boolean> {
    console.log("Agregando un nuevo usuario...");
    await new Promise<void>((resolve) => setTimeout(resolve, 2000));
    const guardaConExito = miEscuelaCRM.agregarUsuario(usuario);
    if (guardaConExito) {
        console.log("Usuario agregado con éxito.");
    } else {
        console.log("Error al agregar el usuario.");
    }
    return guardaConExito;
}

void agregarUsuarioAsync({ id: 4, nombre: "Ana Torres", rol: "alumno", activo: true });

console.log("Versión del CRM:", miEscuelaCRM.verVersion());
// Usamos sus métodos
const profesores = miEscuelaCRM.filtrarUsuariosPorRol("profesor");


console.log("Profesores del centro:", profesores);

miEscuelaCRM.agregarUsuario({ id: 7, nombre: "Carlos Ruiz", rol: "profesor", activo: true });

