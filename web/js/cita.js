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

    // Inicializar calendario vacío (siempre visible)
    let calendar = new FullCalendar.Calendar(calendarEl, {
        initialView: "timeGridWeek",
        locale: "es",
        slotMinTime: "00:00:00",
        slotMaxTime: "23:59:59",
        events: [] // empieza vacío
    });
    calendar.render();

    // Función para generar todos los eventos de los turnos
    function generarEventosTurnos(turnos) {
        let eventos = [];

        turnos.forEach(t => {
            let fechaInicio = new Date(t.fecha_comienzo);
            let fechaFin = new Date(t.fecha_fin);

            for (let d = new Date(fechaInicio); d <= fechaFin; d.setDate(d.getDate() + 1)) {
                let dia = d.toISOString().split("T")[0]; // YYYY-MM-DD
                const start = new Date(dia);
                start.setHours(...t.hora_inicio.split(":"));

                const end = new Date(dia);
                end.setHours(...t.hora_fin.split(":"));

                eventos.push({
                    start: start.toISOString(),
                    end: end.toISOString(),
                    display: "background",
                    backgroundColor: "lightgreen"
                });
            }
        });

        return eventos;
    }

    // Al cambiar la especialidad → cargar médicos
    especialidadSelect.addEventListener("change", async function () {
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
                    medico => medico.tipo_trabajador === "Médico"
                );

                if (especialidad === "Medicina general" && medicosGenerales.length > 0) {
                    medicosGenerales.forEach(medico => {
                        const option = document.createElement("option");
                        option.value = medico.id;
                        option.textContent = medico.nombre;
                        medicoSelect.appendChild(option);
                    });
                } else if (medicosFiltrados.length > 0) {
                    medicosFiltrados.forEach(medico => {
                        const option = document.createElement("option");
                        option.value = medico.id;
                        option.textContent = medico.nombre;
                        medicoSelect.appendChild(option);
                    });
                } else {
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

    // Al cambiar el médico → cargar turnos en el calendario
    medicoSelect.addEventListener("change", async function () {
        const medicoId = this.value;

        if (medicoId) {
            try {
                const turnosMedico = await turnosAPI_auto.getAll({ medicoId });
                const eventosTurnos = generarEventosTurnos(turnosMedico);

                calendar.removeAllEvents(); // limpia eventos anteriores
                calendar.addEventSource(eventosTurnos);
            } catch (err) {
                console.error("Error al cargar turnos:", err);
            }
        } else {
            calendar.removeAllEvents(); // si quita el médico, queda vacío
        }
    });
});
