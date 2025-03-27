document.addEventListener("DOMContentLoaded", async () => {
    const reservasContainer = document.getElementById("reservas-container");
    const reservaTemplate = document.getElementById("reserva-template").content;

    try {
        // Simulando una petición a tu backend
        const respuesta = await fetch("http://localhost:3000/reservas"); // Ajusta la URL según tu servidor
        const reservas = await respuesta.json(); // Suponiendo que el backend devuelve JSON con clientes
        console.log(reservas);
        reservas.forEach(reserva => {
            let fechaLLegada = formatearFecha(reserva.fecha_llegada) ;
            let fechaSalida = formatearFecha(reserva.fecha_salida);
            const clone = document.importNode(reservaTemplate, true);
            clone.querySelector(".card-titulo").textContent = "Reserva No. " + reserva.reserva_id;
            clone.querySelector(".card-nombre-cliente").textContent = "Nombre de cliente: " + reserva.nombre + " "+ reserva.apellido;

            clone.querySelector(".card-fecha-inicio-reserva").textContent = "Fecha de inicio: " + fechaLLegada;

            clone.querySelector(".card-fecha-salida-reserva").textContent = "Fecha de salida: " + fechaSalida;
            
            clone.querySelector(".card-num-habitacion").textContent = "Número de habitación: " + reserva.numero_habitacion;
            clone.querySelector(".card-piso").textContent = "Piso " + reserva.piso;
            clone.querySelector(".card-precio_total").textContent = "L. " + reserva.precio_total;
            clone.querySelector(".card-estado").textContent = reserva.estado;
                        
            reservasContainer.appendChild(clone);
        });
    } catch (error) {
        console.error("Error al obtener reservas:", error);
    }
});



function formatearFecha(fechaString) {
    /**
     * Parsea una cadena de fecha en formato ISO 8601 (como "2025-03-27T00:00:00.000Z")
     * al formato de fecha de Honduras "día/mes/año".
     *
     * @param {string} fechaString La cadena de fecha en formato ISO 8601.
     * @returns {string|null} La fecha formateada en "día/mes/año" o null si la entrada no es válida.
     */
    if (!fechaString || typeof fechaString !== 'string') {
      console.error("Error: La entrada debe ser una cadena de texto válida.");
      return null;
    }
  
    try {
      const fechaObjeto = new Date(fechaString);
  
      if (isNaN(fechaObjeto.getTime())) {
        console.error("Error: No se pudo crear un objeto Date válido a partir de la entrada.");
        return null;
      }
  
      const dia = fechaObjeto.getDate();
      const mes = fechaObjeto.getMonth() + 1; // getMonth() devuelve 0-11
      const año = fechaObjeto.getFullYear();
  
      return `${dia}/${mes}/${año}`;
  
    } catch (error) {
      console.error("Error al parsear la fecha:", error);
      return null;
    }
  }
  
