const axios = require("axios");
const Dev = require("../models/Dev");
const parseStringAsArray = require("../utils/parseStringAsArray");

// Buscar devs em um raio e por tecnologias
module.exports = {
  async index(request, response) {
    const { latitude, longitude, techs } = request.query;
    techsArray = parseStringAsArray(techs);
    const dev = await Dev.find({
      techs: {
        $in: techsArray
      },
      location: {
        $near: {
          $geometry: {
            type: "Point",
            coordinates: [longitude, latitude]
          },
          $maxDistance: 10000
        }
      }
    });
    return response.json({ dev });
  }
};
