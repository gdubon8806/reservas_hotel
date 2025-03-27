import express from "express";
import cors from "cors";
import { obtenerConexionDB } from "./database/connection.js";
import { fileURLToPath } from 'url';
import path from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(fileURLToPath(import.meta.url)); 

const app = express();
app.use(cors()); // Habilita CORS para permitir solicitudes del frontend
app.use(express.json());

app.use(express.static(path.join(__dirname, 'public')));
app.get('/Clientes-formulario', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'clientes.html'));
  });


//Obtener clientes
app.get("/clientes", async (req, res) => {
  try {
    const pool = await obtenerConexionDB();
    const result = await pool.request().query("SELECT * FROM clientes");
    res.json(result.recordset);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Error al obtener los clientes" });
  }
});

//Insertar clientes
app.post("/clientes", async (req, res) => {
  try {
    const conexion = await obtenerConexionDB();
    const query = await conexion.request()
      .query(`INSERT INTO clientes (nombre, apellido,email, telefono,direccion) 
            VALUES ('${req.body.nombre}', '${req.body.apellido}', '${req.body.email}', '${req.body.telefono}', '${req.body.direccion}')`);
            res.status(200).json({ message: 'Cliente agregado correctamente' });
  } catch (error) {
    console.error(`Error al insertar cliente: ${error}`);
  }
});

//Eliminar cliente
app.delete("/clientes/:id", async (req, res) => {
  try {
    const conexion = await obtenerConexionDB();
    const query = await conexion.request()
      .query(`DELETE FROM clientes WHERE cliente_id = ${req.params.id}`);
      res.status(200).json({ message: 'Cliente eliminado correctamente' });
  } catch (error) {
    console.error(`Error al eliminar cliente: ${error}`);
  }
})

//Actualizar cliente
app.put("/clientes/:id", async (req, res) => {
  try {
    const conexion = await obtenerConexionDB();
    const query = await conexion.request()
      .query(`
        UPDATE clientes SET 
          nombre = '${req.body.nombre}', 
          apellido = '${req.body.apellido}', 
          email = '${req.body.email}', 
          telefono = '${req.body.telefono}', 
          direccion = '${req.body.direccion}'
        WHERE cliente_id = ${req.params.id}
      `);
    res.status(200).json({ message: 'Cliente agregado correctamente' });
  } catch (error) {
    console.error(`Error al actualizar cliente: ${error}`);
    res.status(500).json({ error: "Error al actualizar el cliente" });
  }
});

app.get("/clientes/:id", async (req, res) => {
  try {
    const conexion = await obtenerConexionDB();
    const query = await conexion.request()
      .query(`SELECT * FROM clientes WHERE cliente_id = ${req.params.id}`);
    res.json(query.recordset[0]);
  } catch (error) {
    console.error(`Error al obtener cliente: ${error}`);
    res.status(500).json({ error: "Error al obtener el cliente" });
  }
});
// Inserción de habitaciones
app.post("/habitaciones", async (req, res) => {
  const { numero_habitacion, piso, tipo_habitacion, precio_noche, descripcion } = req.body;

  try {
    const conexion = await obtenerConexionDB();
    
    await conexion.request().query(`
      INSERT INTO Habitaciones (
        numero_habitacion, 
        piso, 
        tipo_habitacion, 
        precio_noche, 
        descripcion
      ) VALUES (
        '${numero_habitacion}', 
        '${piso}', 
        '${tipo_habitacion}', 
        '${precio_noche}', 
        '${descripcion}'
      )
    `);

    res.status(200).json({ message: 'Habitación registrada correctamente' });
  } catch (error) {
    console.error('Error al insertar la habitación:', error);
    res.status(500).json({ error: 'Hubo un problema al registrar la habitación' });
  }
});
app.delete("/habitaciones/:id", async (req, res) => {
  try {
    const conexion = await obtenerConexionDB();
    await conexion.request()
      .query(`DELETE FROM Habitaciones WHERE habitacion_id = ${req.params.id}`);
    res.status(200).json({ success: true, message: 'Habitación eliminada correctamente' });
  } catch (error) {
    console.error(`Error al eliminar habitación: ${error}`);
    res.status(500).json({ success: false, error: "Error al eliminar la habitación" });
  }
});

// Ruta para actualizar habitación
app.put("/habitaciones/:id", async (req, res) => {
  try {
    const { numero_habitacion, piso, tipo_habitacion, precio_noche, descripcion } = req.body;
    const conexion = await obtenerConexionDB();
    await conexion.request().query(`
      UPDATE Habitaciones SET 
        numero_habitacion = '${numero_habitacion}',
        piso = '${piso}',
        tipo_habitacion = '${tipo_habitacion}',
        precio_noche = '${precio_noche}',
        descripcion = '${descripcion}'
      WHERE habitacion_id = ${req.params.id}
    `);
    res.status(200).json({ success: true, message: 'Habitación actualizada correctamente' });
  } catch (error) {
    console.error(`Error al actualizar habitación: ${error}`);
    res.status(500).json({ success: false, error: "Error al actualizar la habitación" });
  }
});


// Obtener todas las habitaciones
app.get("/habitaciones", async (req, res) => {
  try {
    const pool = await obtenerConexionDB();
    const result = await pool.request().query("SELECT * FROM Habitaciones");
    res.json(result.recordset);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Error al obtener las habitaciones" });
  }
});

// Obtener una habitación específica por ID
app.get("/habitaciones/:id", async (req, res) => {
  try {
    const pool = await obtenerConexionDB();
    const result = await pool.request()
      .query(`SELECT * FROM Habitaciones WHERE habitacion_id = ${req.params.id}`);
    res.json(result.recordset[0]);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Error al obtener la habitación" });
  }
});
app.get("/reservas", async (req, res) => {
  try {
    const pool = await obtenerConexionDB();
    const result = await pool.request().query("SELECT id, fecha FROM reservas");
    res.json(result.recordset);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Error al obtener las reservas" });
  }
});




const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Servidor corriendo en http://localhost:${PORT}`);
});
