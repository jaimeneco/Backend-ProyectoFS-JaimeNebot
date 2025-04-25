import express from 'express';
import cors from 'cors';

import router from './routes/index.routes.js';
import { PORT, DOMAIN, FULLDOMAIN } from './config/config.js';
import {conectarDB} from './db/mongoose.js'

import { notFoundHandler, errorHandler } from './middlewares/errors.js';


const app = express();

//Permite acceso desxde cualquier servidor
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({extender:true}))

//Limpiar terminal en cada reinicio de proyecto
console.clear();

//Middlewares:
app.use(express.json()); //leer datos que vienen en el body de mi request

// LLamar a función de conexión
conectarDB();

//Rutas del front:
app.get("/", (req, res, next) => {
    res.send("Bienvenidos a nuestra API de pruebas de Auth")
});

// Rutas de nuestro API
app.use("/api/v1/", router);

// Middleware de errores:
app.use(notFoundHandler);
app.use(errorHandler)


app.listen(PORT, ()=> {
    console.log(`Servidor funcionando en ${FULLDOMAIN}`);
})