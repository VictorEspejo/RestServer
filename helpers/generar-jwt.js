const jwt = require('jsonwebtoken')

//RETORNA UNA PROMESA QUE DEVUELVE EL TOKEN GENERADO CON LA SECRETKEY Y LA HORA DE EXPIRACION 
const generarJWT = (uid = '') => { 
    return new Promise((resolve, reject) => {
        const payload = { uid };
        jwt.sign(payload, process.env.SECRETKEY, {expiresIn: '1h'}, (err, token) => { 
            err ? reject('No se pudo generar el token') : resolve(token);
         });
    })
 }

module.exports = {
    generarJWT
}