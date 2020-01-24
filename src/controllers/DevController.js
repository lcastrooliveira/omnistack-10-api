const axios = require("axios");
const Dev = require("../models/Dev");
const parseStringAsArray = require("../utils/parseStringAsArray");
const { findConnections, sendMessage } = require("../websocket");

module.exports = {
  async index(request, response) {
    const devs = await Dev.find();
    return response.json(devs);
  },

  async store(request, response) {
    const { github_username, techs, latitude, longitude } = request.body;
    let dev = await Dev.findOne({ github_username });
    if (!dev) {
      const api_response = await axios.get(
        `https://api.github.com/users/${github_username}`
      );
      const { name = login, avatar_url, bio } = api_response.data;
      techsArray = parseStringAsArray(techs);
      const location = {
        type: "Point",
        coordinates: [longitude, latitude]
      };
      dev = await Dev.create({
        github_username,
        name,
        avatar_url,
        bio,
        techs: techsArray,
        location
      });
      // Filtrar as conexoes que estao no maximo 10km de distancia e que o
      // novo dev tenha pelo menos as techs filtradas.
      const sendSocketMessagetTo = findConnections(
        {
          latitude,
          longitude
        },
        techsArray
      );
      sendMessage(sendSocketMessagetTo, "new-dev", dev);
    }

    return response.json(dev);
  }
};
