const authorizeRole = (role) => {
    return (req, res, next) => {
        const currentUser = req.user;
        if (!currentUser || currentUser.role !== role) {
            return res.status(403).send("Acceso no autorizado");
        }

        next();
    };
}

export default authorizeRole;