const express = require("express");
const cors = require("cors");
const { dbConnection } = require("../database/config");

class Server {
  constructor() {
    this.app = express();
    this.port = process.env.PORT || 8080;
    this.paths = {
      users: "/api/usuarios",
      auth: "/api/auth",
      categories: "/api/category",
    };

    this.conectarDB();

    this.middlewares();

    //Rutas de mi aplicacion
    this.routes();
  }

  routes() {
    this.app.use(this.paths.users, require("../routes/user"));
    this.app.use(this.paths.auth, require("../routes/auth"));
    this.app.use(this.paths.categories, require("../routes/categories"));
  }

  async conectarDB() {
    await dbConnection();
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
