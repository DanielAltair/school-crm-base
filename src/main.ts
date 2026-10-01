import { CRMController } from './controllers/crm.controller';

const crm = new CRMController();

async function ejecutarPrueba() {
    console.log("=== Iniciando simulación de SchoolCRM ===");

    try {
        const conflicto = await crm.comprobarConflictoProfesor('prof1', 'Lunes', '1ª Hora');
        const informe = await crm.obtenerInformeAlumno('alumno1');

        console.log(`¿Hay conflicto horario?: ${conflicto}`);
        console.log('Informe del alumno:', informe);
    } catch (error) {
        console.error("Error en la ejecución:", error);
    }
}

ejecutarPrueba();
