const { response, request } = require("express");

const find = (req = request, res = response) => {
  res.json({
    msg: "Buscar",
  });
};

module.exports = {
  find,
};
