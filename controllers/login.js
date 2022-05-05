const { response } = require('express');
const User = require('../models/usuario.js')
const bcrypt = require('bcryptjs');
const { generarJWT } = require('../helpers/generar-jwt.js');

const login = async (req, res = response) => { 
    const { email, password } = req.body;
    try {
        const usuario = await User.findOne({ email });
        if(!usuario || !usuario.status) return res.status(400).json({msg: 'El correo o usuario no existe'});
        const validarPassword = bcrypt.compareSync(password, usuario.password)
        if(!validarPassword) return res.status(400).json({msg: 'La contraseña no es correcta'})
        //Generar el JWT
        const token = await generarJWT(usuario.id)
        res.json({usuario, token})
    } catch (error) {
        return res.status(500).json({msg: 'Error del servidor'})
    }
 }

 module.exports = {
     login
 }