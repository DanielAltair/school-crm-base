import type { Asistencia, Sancion, RegistroHorario, EstadoAsistencia, TipoSancion, DiaSemana, FranjaHoraria } from '../models/interfaces';
import { StorageService } from '../services/storage.service';

export class CRMController {
    // Inicialización de los almacenes persistentes
    private readonly asistenciaStorage = new StorageService<Asistencia>('crm_asistencias');
    private readonly sancionesStorage = new StorageService<Sancion>('crm_sanciones');
    private readonly horariosStorage = new StorageService<RegistroHorario>('crm_horarios');

    private simularLatencia(): Promise<void> {
        return new Promise((resolve) => setTimeout(resolve, 300));
    }

    /**
     * Registra una falta, retraso o asistencia en el sistema de forma asíncrona.
     */
    public async registrarAsistencia(alumnoId: string, profesorId: string, franja: FranjaHoraria, estado: EstadoAsistencia): Promise<boolean> {
        await this.simularLatencia();

        const asistencia: Asistencia = {
            id: crypto.randomUUID(),
            alumnoId,
            profesorId,
            fecha: new Date().toISOString().slice(0, 10),
            franja,
            estado,
        };

        this.asistenciaStorage.add(asistencia);
        return true;
    }

    /**
     * Registra una sanción disciplinaria.
     */
    public async registrarSancion(alumnoId: string, profesorId: string, tipo: TipoSancion, descripcion: string): Promise<void> {
        await this.simularLatencia();

        const sancion: Sancion = {
            id: crypto.randomUUID(),
            alumnoId,
            profesorId,
            fecha: new Date().toISOString().slice(0, 10),
            tipo,
            descripcion,
        };

        this.sancionesStorage.add(sancion);
    }

    /**
     * VERIFICACIÓN CRÍTICA: Comprueba si un profesor ya tiene una clase asignada en el mismo día y hora.
     * Devuelve true si hay conflicto (el profesor está duplicado) o false si está libre.
     */
    public async comprobarConflictoProfesor(profesorId: string, dia: DiaSemana, franja: FranjaHoraria): Promise<boolean> {
        // TODO: Buscar coincidencias exactas de profesor, día y franja.
        void [profesorId, dia, franja, this.horariosStorage];
        throw new Error('Método no implementado');
    }

    /**
     * Genera un informe resumido con el total de faltas y retrasos de un alumno concreto.
     */
    public async obtenerInformeAlumno(alumnoId: string): Promise<{ faltas: number; retrasos: number; sanciones: number }> {
        // TODO: Contar faltas, retrasos y sanciones del alumno.
        void [alumnoId, this.asistenciaStorage, this.sancionesStorage];
        throw new Error('Método no implementado');
    }
}
