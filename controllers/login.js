const { response, request, json } = require("express");
const User = require("../models/usuario.js");
const bcrypt = require("bcryptjs");
const { generarJWT } = require("../helpers/generar-jwt.js");
const { googleVerify } = require("../helpers/google-verify.js");

const login = async (req, res = response) => {
  const { email, password } = req.body;
  try {
    const usuario = await User.findOne({ email });
    if (!usuario || !usuario.status)
      return res.status(400).json({ msg: "El correo o usuario no existe" });
    const validarPassword = bcrypt.compareSync(password, usuario.password);
    if (!validarPassword)
      return res.status(400).json({ msg: "La contraseña no es correcta" });
    //Generar el JWT
    const token = await generarJWT(usuario.id);
    res.json({ usuario, token });
  } catch (error) {
    return res.status(500).json({ msg: "Error del servidor" });
  }
};

const googleSignIn = async (req, res = response) => {
  const { id_token } = req.body;
  try {
      //Verificar token de google
    const { email, name, img } = await googleVerify(id_token);
    let user = await User.findOne({ email })
    
    //Validar si el usuario existe y no está bloqueado
    if(!user){
        const data = {
            name,
            email,
            password: 'Gpass',
            img,
            google: true
        };
        user = new User(data);
        await user.save();
    }

    if(!user.status) return res.status(401).json({msg: 'Usuario Bloqueado, hable con administrador'})

    //Crear token privado
    const token = await generarJWT(user.id);

    res.json({ user, token });
  } catch (error) {
      res.status(400).json({
          msg: 'El token no se pudo verificar'
      })
  }
};

module.exports = {
  login,
  googleSignIn,
};
