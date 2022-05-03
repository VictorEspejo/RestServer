const express = require("express");
const cors = require("cors");

class Server {
  constructor() {
    this.app = express();
    this.port = process.env.PORT;
    this.usuariosPath = '/api/usuarios';

    this.middlewares();

    //Rutas de mi aplicacion
    this.routes();
  }

  routes() {
    this.app.use(this.usuariosPath, require("../routes/user"));
  }

  middlewares() {
    //CORS
    this.app.use(cors());

    //Lectura y parseo de body
    this.app.use(express.json());

    //Directorio publico
    this.app.use(express.static("public"));
  }

  listen() {
    this.app.listen(this.port, () => {
      console.log("Servidor corriendo en el puerto:", this.port);
    });
  }
}

module.exports = Server;
