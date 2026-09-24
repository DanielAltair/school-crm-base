
import type { Usuario } from '../interfaces';

const USUARIOS_INICIALES: Usuario[] = [
    { id: 1, nombre: 'Ana Martinez', rol: 'alumno', activo: true, tieneCoche: 'Toyota' },
    { id: 2, nombre: 'Daniel Izquierdo', rol: 'alumno', activo: true },
    { id: 3, nombre: 'Carlos Regina', rol: 'admin', activo: false },
    { id: 4, nombre: 'Paco Gonzalez', rol: 'profesor', activo: true }
];

export class CRMController {
    private readonly claveStorage = 'school_crm_usuarios';
    private listaUsuarios: Usuario[];

    constructor() {
        this.listaUsuarios = this.leerDelDisco();
    }

    public obtenerUsuarios(): Usuario[] {
        return [...this.listaUsuarios];
    }

    public obtenerUsuariosPorRol(rolBuscado: Usuario['rol']): Usuario[] {
        return this.listaUsuarios.filter(usuario => usuario.rol === rolBuscado);
    }

    public agregarUsuario(nuevoUsuario: Usuario): void {
        const idDuplicado = this.listaUsuarios.some(usuario => usuario.id === nuevoUsuario.id);

        if (idDuplicado) {
            console.error(`El ID ${nuevoUsuario.id} ya existe.`);
            return;
        }

        this.listaUsuarios.push(nuevoUsuario);
        this.guardarEnDisco();
    }

    private leerDelDisco(): Usuario[] {
        const datosLocales = localStorage.getItem(this.claveStorage);

        if (!datosLocales) {
            this.listaUsuarios = [...USUARIOS_INICIALES];
            this.guardarEnDisco();
            return this.listaUsuarios;
        }

        try {
            const usuariosGuardados = JSON.parse(datosLocales) as Usuario[];

            if (Array.isArray(usuariosGuardados) && usuariosGuardados.length > 0) {
                return usuariosGuardados;
            }
        } catch {
            console.warn('Los usuarios guardados no son válidos. Se usarán los iniciales.');
        }

        this.listaUsuarios = [...USUARIOS_INICIALES];
        this.guardarEnDisco();
        return this.listaUsuarios;
    }

    private guardarEnDisco(): void {
        localStorage.setItem(this.claveStorage, JSON.stringify(this.listaUsuarios));
    }
}