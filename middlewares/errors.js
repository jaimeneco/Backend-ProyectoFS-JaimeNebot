export const notFoundHandler = (req, res, next) => {
    const error = new Error(`404 ruta no encontrada`);
    res.status(404);
    next(error);
};

export const errorHandler = (err, req, res, next) => {

    const statusCode = res.statusCode == 200 ? 500 : res.statusCode;

    res.status(statusCode).json({
        status: statusCode,
        msg: err.message,
        stack: process.env.NODE_ENV !== 'production' ? '' : err.stack //Aquí se mostrarán los archivos que ocasionaron el error. Para probar como se vería, solo hay que pasar de == a !== y se muestra el resultado contrario. Esto sirve para que el error no le aparezca al usuario pero que sí le aparezca al desarrollador.

    });
}