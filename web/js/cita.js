import { pacientesAPI_auto } from "/js/api/_pacientes.js";
import { turnosAPI_auto } from "/js/api/_turnos.js";
import { citasAPI_auto } from "/js/api/_citas.js";

document.addEventListener("DOMContentLoaded", async function() {
    const especialidadSelect = document.getElementById("especialidad");
    const medicoSelect = document.getElementById("medico");
    const calendarEl = document.getElementById("calendar");

    if (!especialidadSelect || !medicoSelect) {
        console.error("No se encontró el elemento en el DOM");
        return;
    }

    especialidadSelect.addEventListener("change", async function() {
        const especialidad = this.value;
        medicoSelect.innerHTML = '<option value="">-- Seleccione médico --</option>';

        if (especialidad) {
            try {
                const data = await pacientesAPI_auto.getAll();
                const medicosFiltrados = data.filter(
                    medico =>
                        medico.tipo_trabajador === "Doctor" &&
                        medico.tipo_especialidad === especialidad
                );
                const medicosGenerales = data.filter(
                    medico =>
                        medico.tipo_trabajador === "Médico"
                );

                if (especialidad === "Medicina general" && medicosGenerales.length > 0) {
                    medicosGenerales.forEach(medico => {
                        const option = document.createElement("option");
                        option.value = medico.id;
                        option.textContent = medico.nombre;
                        medicoSelect.appendChild(option);
                    });
                }

                else if (medicosFiltrados.length > 0) {
                    medicosFiltrados.forEach(medico => {
                        const option = document.createElement("option");

                        option.value = medico.id;
                        option.textContent = medico.nombre;
                        medicoSelect.appendChild(option);
                    });
                }
                
                else {
                    const option = document.createElement("option");
                    option.textContent = "No hay doctores para esta especialidad";
                    option.disabled = true;
                    medicoSelect.appendChild(option);
                }
            } catch (err) {
                console.error("Error al obtener doctores:", err);
            }
        }
    });

    // Inicializar calendario
    let calendar = new FullCalendar.Calendar(calendarEl, {
        initialView: "timeGridWeek",
        locale: "es",
        slotMinTime: "00:00:00",
        slotMaxTime: "23:59:00",
        selectable: true,
        events: [] // se llenará dinámicamente
    });
    calendar.render();

    // Cuando se selecciona médico
    medicoSelect.addEventListener("change", async () => {
        let medicoId = medicoSelect.value;
        if (!medicoId) return;

        // Cargar turnos del médico
        let turnos = await turnosAPI_auto.getAll(); // No me coge los turnos
        let turnosMedico = turnos.filter(t => t.medicoId == medicoId);

        // Cargar citas ya cogidas
        let citas = await citasAPI_auto.getAll();
        let citasMedico = citas.filter(c => c.medicoId == medicoId);

        // Mapear turnos a eventos del calendario
        let eventosTurnos = turnosMedico.map(t => ({
            id: "turno-" + t.id,
            title: "Disponible",
            start: t.fechaInicio,
            end: t.fechaFin,
            color: "green"
        }));

        // Mapear citas a eventos ocupados
        let eventosCitas = citasMedico.map(c => ({
            id: "cita-" + c.id,
            title: "Ocupado",
            start: c.fecha,
            end: c.fecha_fin || c.fecha, // depende cómo lo tengas en la BD
            color: "red"
        }));

        // Actualizar calendario
        calendar.removeAllEvents();
        calendar.addEventSource(eventosTurnos);
        calendar.addEventSource(eventosCitas);

        // 👩‍⚕️ Cuando cambie el médico, cargamos sus turnos
        selectMedico.addEventListener("change", async () => {
            const medicoId = selectMedico.value;

            // 1. Pedimos los turnos del médico
            const turnos = await turnosAPI_auto.getByMedico(medicoId);

            // 2. Borramos los eventos antiguos
            calendar.removeAllEvents();

            // 3. Insertamos turnos como background events
            turnos.forEach(t => {
                calendar.addEvent({
                    start: t.inicio,  // formato ISO: "2025-08-19T08:00:00"
                    end: t.fin,       // formato ISO: "2025-08-19T12:00:00"
                    display: "background",
                    backgroundColor: "lightgreen"
                });
            });
        });
    });
});
