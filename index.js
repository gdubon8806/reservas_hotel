document.addEventListener("DOMContentLoaded", async () => {
    const reservasContainer = document.getElementById("reservas-container");
    const reservaTemplate = document.getElementById("reserva-template").content;

    try {
        // Simulando una petición a tu backend
        const respuesta = await fetch("http://localhost:3000/reservas"); // Ajusta la URL según tu servidor
        const reservas = await respuesta.json(); // Suponiendo que el backend devuelve JSON con clientes

        reservas.forEach(reserva => {
            const clone = document.importNode(reservaTemplate, true);
            clone.querySelector(".card-title").textContent = reserva.id;
            clone.querySelector(".fecha-reserva").textContent = reserva.fecha;
                        
            reservasContainer.appendChild(clone);
        });
    } catch (error) {
        console.error("Error al obtener reservas:", error);
    }
});
