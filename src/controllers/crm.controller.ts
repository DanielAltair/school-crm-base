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
        await this.simularLatencia();

        return this.horariosStorage.getAll().some((horario) =>
            horario.profesorId === profesorId &&
            horario.dia === dia &&
            horario.franja === franja,
        );
    }

    /**
     * Genera un informe resumido con el total de faltas y retrasos de un alumno concreto.
     */
    public async obtenerInformeAlumno(alumnoId: string): Promise<{ faltas: number; retrasos: number; sanciones: number }> {
        await this.simularLatencia();

        const asistencias = this.asistenciaStorage.getAll().filter((asistencia) => asistencia.alumnoId === alumnoId);
        const sanciones = this.sancionesStorage.getAll().filter((sancion) => sancion.alumnoId === alumnoId);

        return {
            faltas: asistencias.filter((asistencia) => asistencia.estado === 'falta').length,
            retrasos: asistencias.filter((asistencia) => asistencia.estado === 'retraso').length,
            sanciones: sanciones.length,
        };
    }
}
