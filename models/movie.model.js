const mongoose = require("mongoose");
const movieSchema = new mongoose.Schema({
  movieTitle: {
    type: String,
  },
  director: {
    type: String,
  },
  genre: {
    type: String,
  },
});
const Movie2 = mongoose.model("Movie2", movieSchema);

module.exports = { Movie2 };
