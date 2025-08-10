document.addEventListener("DOMContentLoaded", () => {
    const fechaInput = document.getElementById("nacimiento-input");

    const hoy = new Date();
    const yyyy = hoy.getFullYear();
    const mm = String(hoy.getMonth() + 1).padStart(2, '0'); // meses van de 0 a 11
    const dd = String(hoy.getDate()).padStart(2, '0');

    const fechaMaxima = `${yyyy}-${mm}-${dd}`;
    fechaInput.max = fechaMaxima;
});
