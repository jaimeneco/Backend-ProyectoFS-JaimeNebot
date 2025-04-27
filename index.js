import express from 'express';
import cors from 'cors';

import router from './routes/index.routes.js';
import { PORT, DOMAIN, FULLDOMAIN } from './config/config.js';
import {conectarDB} from './db/mongoose.js'

// const BACKEND_URL = process.env.BACKEND_URL || "http://localhost:3000"

const app = express();

//Permite acceso desxde cualquier servidor
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({extender:true}))

conectarDB();

console.clear();
app.get("/", (req, res) => {
    res.send("Bienvenidos a mi API de ONPIK")
});

//Middlewares:
app.use(express.json()); //leer datos que vienen en el body de mi request


// Rutas de mi API
app.use("/api/v1/", router);


// manejador de errores
app.use((err, req, res, next) => {
    console.error(err)
    res.status(500).json({ msg: 'Error  interno del servidor' })
})

// Puerto
app.listen(PORT, () => {
    console.log(`Servidor funcionando en ${DOMAIN}:${PORT}`)
})