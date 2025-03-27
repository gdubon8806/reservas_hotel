document.addEventListener("DOMContentLoaded", async () => {
    const clientesContainer = document.getElementById("clientes-container");
    const clienteTemplate = document.getElementById("cliente-template").content;

    try {
        // Simulando una petición a tu backend
        const respuesta = await fetch("http://localhost:3000/clientes"); // Ajusta la URL según tu servidor
        const clientes = await respuesta.json(); // Suponiendo que el backend devuelve JSON con clientes

        clientes.forEach(cliente => {
            const clone = document.importNode(clienteTemplate, true);
            clone.querySelector(".card-title").textContent = cliente.nombre;
            clone.querySelector(".telefono").textContent = cliente.telefono;
            clientesContainer.appendChild(clone);
        });
    } catch (error) {
        console.error("Error al obtener clientes:", error);
    }
});
