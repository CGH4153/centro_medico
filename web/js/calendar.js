import { sessionManager } from "/js/utils/session.js";

document.addEventListener('DOMContentLoaded', async function () {
    var calendarEl = document.getElementById('calendar');
    const usuarioId = sessionManager.getLoggedId();

    var calendar = new FullCalendar.Calendar(calendarEl, {
        initialView: 'timeGridWeek',
        locale: 'es',
        buttonText: {
            today: 'Hoy',
        },
        dateClick: function (info) {
            window.location.href = 'crear_cita.html?fecha=' + info.dateStr;
        },
        events: []
    });

    calendar.render();

    // Función auxiliar para normalizar horas
    function normalizarHora(hora) {
        if (!hora) return null;
        let partes = hora.split(":"); // ej: ["9","00","00"]
        let hh = partes[0].padStart(2, "0");
        let mm = partes[1] || "00";
        return `${hh}:${mm}`;
    }

    // Función para generar los eventos de tipo background
    function generarEventosTurnos(turnos) {
        let eventos = [];

        turnos.forEach(t => {
            let fechaInicio = new Date(t.fecha_comienzo);
            let fechaFin = new Date(t.fecha_fin);

            if (isNaN(fechaInicio) || isNaN(fechaFin)) return;

            for (let d = new Date(fechaInicio); d <= fechaFin; d.setDate(d.getDate() + 1)) {
                let dia = d.toISOString().split("T")[0];

                let horaInicio = normalizarHora(t.hora_inicio);
                let horaFin = normalizarHora(t.hora_fin);

                if (!horaInicio || !horaFin) continue;

                let start = new Date(`${dia}T${horaInicio}`);
                let end;

                if (horaFin === "00:00") {
                    end = new Date(`${dia}T23:59`);
                } else {
                    end = new Date(`${dia}T${horaFin}`);
                }

                eventos.push({
                    start: start.toISOString(),
                    end: end.toISOString(),
                    display: "background", // 👈 se pinta de fondo
                    backgroundColor: "lightgreen"
                });
            }
        });

        return eventos;
    }

    // ⚡ Llamada al backend para traer turnos del usuario logueado
    if (usuarioId) {
        try {
            const turnosUsuario = await fetch(`/api/turnos?medicoId=${usuarioId}`).then(r => r.json());
            const eventosTurnos = generarEventosTurnos(turnosUsuario);
            calendar.addEventSource(eventosTurnos);
        } catch (err) {
            console.error("Error al cargar turnos del usuario:", err);
        }
    }
});
