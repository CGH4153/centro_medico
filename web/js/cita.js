import { pacientesAPI_auto } from "/js/api/_pacientes.js";

document.addEventListener("DOMContentLoaded", () => {
    const especialidadSelect = document.getElementById("especialidad");
    const medicoSelect = document.getElementById("medico");

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

                if (medicosFiltrados.length > 0) {
                    medicosFiltrados.forEach(medico => {
                        const option = document.createElement("option");

                        if(option === 'Medicina general'){ // No me coge los médicos
                            option.value = medicosGenerales.id;
                            option.textContent = medicosGenerales.nombre;
                            medicoSelect.appendChild(option);
                        }

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
});
