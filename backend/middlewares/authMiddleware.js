
import jwt from "jsonwebtoken";
import User from "../models/User.js";

export const checkAuth = async (req, res, next) => {
    let token;
    if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
        console.log('Si tiene el token con bearer');
    }
    try {
        token = req.headers.authorization.split(" ")[1];
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = await User.findById(decoded.id).select("-password -token -confirm -roles");
        return next();

    } catch (error) {
        const e = new Error('Token no valido');
        return res.status(403).json({ msg: e.message });
    }
    if (!token) {
        const error = new Error('Token no valido o inexistente');
        res.status(403).json({ msg: error, message });
    }
    next();
}

export const checkRole = async (req, res, next) => {
    let token;
    if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
        console.log('Si tiene el token con bearer');
    }
    try {
        token = req.headers.authorization.split(" ")[1];
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = await User.findById(decoded.id).select("-password -token -confirm -roles");
        if (req.user.role != "admin") {
            res.status(403).json({ msg: "no tiene permisos" });
        }
        return next();

    } catch (error) {
        console.log(error);
        const e = new Error('Token no valido');
        return res.status(403).json({ msg: e.message });
    }
    if (!token) {
        const error = new Error('Token no valido o inexistente');
        res.status(403).json({ msg: error, message });
    }
    next();
}

