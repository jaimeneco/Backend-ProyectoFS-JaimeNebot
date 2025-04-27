export const isAdmin = (req, res, next) => {
    //verificar si el usuario tiene role de admin
    if (req.user && req.user.role === 'admin') {
        return next(); //continuar si es admin
    } else {
        return res.status(403).json({
            msg: 'Acceso denegado'
        })
    }
}