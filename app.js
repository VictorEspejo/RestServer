const Server = require("./models/server");

require("dotenv").config(); //VARIABLES DE ENTORNO GLOBALES

const server = new Server();
server.listen()