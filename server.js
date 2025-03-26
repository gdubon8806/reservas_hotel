import express from "express";
import cors from "cors";
import { obtenerConexionDB } from "./database/connection.js";

const app = express();
app.use(cors()); // Habilita CORS para permitir solicitudes del frontend
app.use(express.json());

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
  } catch (error) {
    console.error(`Error al insertar cliente: ${error}`);
  }
});

//Eliminar cliente
app.delete("/clientes/:id", async (req, res) => {
  try {
    const conexion = await obtenerConexionDB();
    const query = await conexion.request()
      .query(`DELETE FROM clientes WHERE id = ${req.params.id}`);
  } catch (error) {
    console.error(`Error al eliminar cliente: ${error}`);
  }
})

//Actualizar cliente
app.put("/clientes/:id", async (req, res) => {
  try {
    const conexion = await obtenerConexionDB();
    const query = await conexion.request()
      .query(`UPDATE clientes SET 
      nombre = '${req.body.nombre}', 
      apellido = '${req.body.apellido}', 
      email = '${req.body.email}', 
      telefono = '${req.body.telefono}', 
      direccion = '${req.body.direccion}'
      WHERE id = ${req.params.id}`);
  } catch (error) {
    console.error(`Error al actualizar cliente: ${error}`);
  }
})

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
