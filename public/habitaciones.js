document.addEventListener("DOMContentLoaded", async () => {
    const habitacionesContainer = document.getElementById("habitaciones-container");
    const habitacionTemplate = document.getElementById("habitacion-template").content;

    try {
        // Hacer una petición al backend para obtener las habitaciones
        const respuesta = await fetch("http://localhost:3000/habitaciones"); // Ajusta la URL según tu servidor
        const habitaciones = await respuesta.json(); // Suponiendo que el backend devuelve JSON con habitaciones

        habitaciones.forEach(habitacion => {
            const clone = document.importNode(habitacionTemplate, true);
            clone.querySelector(".numero-habitacion").textContent = habitacion.numero_habitacion;
            clone.querySelector(".piso").textContent = habitacion.piso;
            clone.querySelector(".tipo-habitacion").textContent = habitacion.tipo_habitacion;
            clone.querySelector(".precio-noche").textContent = `$${habitacion.precio_noche}`;
            clone.querySelector(".descripcion").textContent = habitacion.descripcion;
            habitacionesContainer.appendChild(clone);
        });
    } catch (error) {
        console.error("Error al obtener habitaciones:", error);
    }
});
