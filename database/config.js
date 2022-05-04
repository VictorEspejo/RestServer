const mongoose = require('mongoose');

const dbConnection = async () => { 
    try {
        await mongoose.connect(process.env.MONGO_CNN)
        console.log('Base de datos conectada');
        
    } catch (error) {
       throw new Error('Error en la base de datos') 
    }
 }

module.exports = {
    dbConnection
}