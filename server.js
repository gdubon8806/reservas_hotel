import express from 'express';
import cors from 'cors';
import { obtenerConexionDB } from './database/connection.js';

const app = express();
app.use(cors()); // Habilita CORS para permitir solicitudes del frontend
app.use(express.json());

app.get('/clientes', async (req, res) => {
    try {
        const pool = await obtenerConexionDB();
        const result = await pool.request().query("SELECT nombre, telefono FROM clientes");
        res.json(result.recordset);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Error al obtener los clientes" });
    }
});

app.get('/reservas', async (req, res) => {
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
