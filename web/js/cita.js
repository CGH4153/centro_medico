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
    function normalizarHora(hora) {
        if (!hora) return null;
        let partes = hora.split(":"); // ej: ["0", "00", "00"]
        let hh = partes[0].padStart(2, "0"); // "0" → "00"
        let mm = partes[1] || "00";          // "00"
        return `${hh}:${mm}`;                // "00:00"
    }

    function generarEventosTurnos(turnos) {
        let eventos = [];

        turnos.forEach(t => {
            let fechaInicio = new Date(t.fecha_comienzo);
            let fechaFin = new Date(t.fecha_fin);

            if (isNaN(fechaInicio) || isNaN(fechaFin)) {
                console.warn("Turno con fechas inválidas:", t);
                return;
            }

            for (let d = new Date(fechaInicio); d <= fechaFin; d.setDate(d.getDate() + 1)) {
                let dia = d.toISOString().split("T")[0]; // YYYY-MM-DD

                let horaInicio = normalizarHora(t.hora_inicio);
                let horaFin = normalizarHora(t.hora_fin);

                if (!horaInicio || !horaFin) {
                    console.warn("Turno sin horas válidas:", t);
                    continue;
                }

                let start = new Date(`${dia}T${horaInicio}`);
                let end;

                if (horaFin === "00:00") {
                    // 👇 si hora_fin = 00:00 lo pasamos a 23:59 del mismo día
                    end = new Date(`${dia}T23:59`);
                } else {
                    end = new Date(`${dia}T${horaFin}`);
                }

                if (isNaN(start) || isNaN(end)) {
                    console.warn("Fecha/hora inválida en turno:", t);
                    continue;
                }

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

    // Al cambiar el médico → cargar turnos en el calendario => No lo hace, solo muestra en verde un turno(00:00 a 12:00)
    medicoSelect.addEventListener("change", async function () {
        const medicoId = this.value;

        calendar.removeAllEvents();
        calendar.getEventSources().forEach(src => src.remove()); // 🔑 limpiar bien

        if (medicoId) {
            try {
                const turnosMedico = await turnosAPI_auto.getAll({ medicoId });
                const eventosTurnos = generarEventosTurnos(turnosMedico);
                calendar.addEventSource(eventosTurnos);
            } catch (err) {
                console.error("Error al cargar turnos:", err);
            }
        }
    });

    // 🔑 --- NUEVO: seleccionar fecha/hora pasada por query string ---
    const params = new URLSearchParams(window.location.search);
    const fechaParam = params.get("fecha"); // ej: 2025-08-22T06:00:00+02:00
    if (fechaParam) {
        const fechaSeleccionada = new Date(fechaParam);
        if (!isNaN(fechaSeleccionada)) {
            calendar.gotoDate(fechaSeleccionada);

            // marcar el slot de 1h desde la fecha pasada
            const endSeleccionada = new Date(fechaSeleccionada.getTime() + 60 * 60 * 1000);

            calendar.addEvent({
                start: fechaSeleccionada.toISOString(),
                end: endSeleccionada.toISOString(),
                title: "Nueva cita",
                backgroundColor: "blue",
                borderColor: "darkblue"
            });
        }
    }
});
