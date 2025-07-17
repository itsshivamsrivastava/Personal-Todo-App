const authorizeRoles = (...roles) => {
    return (req, res, next) => {
        if (!req.user || !roles.includes(req.user.role)) { 
            return res.status(403).json({ message: 'Forbidden: You do not have the necessary role to access this resource' });
        }
        next();
    };
};

module.exports = { authorizeRoles };