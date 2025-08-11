document.addEventListener('DOMContentLoaded', function () {
    var calendarEl = document.getElementById('calendar');

    var calendar = new FullCalendar.Calendar(calendarEl, {
        initialView: 'dayGridMonth',
        locale: 'es', // Para que aparezca "Hoy" y los días en español
        buttonText: {
            today: 'Hoy', // Cambiar texto del botón
        },
        dateClick: function (info) {
            window.location.href = 'crear_cita.html?fecha=' + info.dateStr;
        }
    });

    calendar.render();
});
