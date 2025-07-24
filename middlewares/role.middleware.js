export const isAdmin = (req, res, next) => {
    //Sirve para verificar si el usuario tiene un role u otro.
    if (req.user && req.user.role === 'admin') {
        return next(); //continuar si es admin
    } else {
        return res.status(403).json({
            msg: 'Acceso denegado'
        })
    }
}