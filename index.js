import express from 'express';
import router from './routes/index.routes.js';
import { PORT, DOMAIN, FULLDOMAIN } from './config/config.js';
import {conectarDB} from './db/mongoose.js'

import { notFoundHandler, errorHandler } from './middlewares/errors.js';
import cors from 'cors';

const app = express();

//Permite acceso desxde cualquier servidor
app.use(cors());

//Limpiar terminal en cada reinicio de proyecto
console.clear();

//Middlewares:
app.use(express.json()); //leer datos que vienen en el body de mi request

// LLamar a función de conexión
conectarDB();

//Rutas del front:
app.get("/", (req, res, next) => {
    res.send("Bienvenidos a nuestra API de ToDo List con Express + Sqlite")
});

// Rutas de nuestro API
app.use("/api/v1/", router);

// Middleware de errores:
app.use(notFoundHandler);
app.use(errorHandler)


app.listen(PORT, ()=> {
    console.log(`Servidor funcionando en ${FULLDOMAIN}`);
})