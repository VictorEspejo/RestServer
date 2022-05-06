const jwt = require('jsonwebtoken')
const { request, response } = require('express')
const User = require('../models/usuario')

//Obtiene el token de la request, valida que sea correcto y en tal caso almacena el usuario asociado a ese token a la request
const validarJWT = async (req = request, res = response, next) => { 
    const token = req.header('x-token')
    if(!token) return res.status(401).json({ msg: 'No hay token'})

    try {
        const { uid } = jwt.verify(token, process.env.SECRETKEY);
        const userAuth = await User.findById(uid);
        if(!userAuth || !userAuth.status) return res.status(401).json({ msg: "Token no es valido/ Usuario inexistente" });
        req.userAuth = userAuth;
        next();
    } catch (error) {
        res.status(401).json({ msg: "Token no es valido" });
    }
 }

 module.exports = {
     validarJWT
 }