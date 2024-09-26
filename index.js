const express = require("express");
const cors = require("cors");
const app = express();

const { initializeDatabase } = require("./db/db.connection");
const { Movie2 } = require("./models/movie.model");

app.use(cors());
app.use(express.json());

initializeDatabase();

app.get("/", (req, res) => {
  res.send("Hello expresso!");
});

// for getting movies
app.get("/movies", async (req, res) => {
  try {
    const movies = await Movie2.find();
    if (movies.length >= 0) {
      res.status(200).json({ movies: movies });
    } else {
      res.status(404).json({ error: "Movies not found" });
    }
  } catch (error) {
    res.status(500).json({ error: "Internal server error" });
  }
});

// for posting movie
app.post("/movies", async (req, res) => {
  const newMovie = req.body;
  try {
    const movieData = new Movie2(newMovie);
    await movieData.save();
    res.status(201).json({ message: "Movie added successfully", movieData });
  } catch (error) {
    res.status(500).json({ error: "Internal server error" });
  }
});

// for deleting movie
app.delete("/movies/movie/:id", async (req, res) => {
  const movieId = req.params.id;
  try {
    const deletedMovie = await Movie2.findByIdAndDelete(movieId);
    if (!deletedMovie) {
      res.status(404).json({ error: "Movie not found" });
    }
    res
      .status(200)
      .json({ message: "Movie deleted successfully", movie: deletedMovie });
  } catch (error) {
    res.status(500).json({ error: "Internal server error" });
  }
});

// for editing
app.put("/movies/movie/:id", async (req, res) => {
  try {
    const movieId = req.params.id;
    const updatedMovieDetail = req.body;
    const updateMovie = await Movie2.findByIdAndUpdate(
      movieId,
      updatedMovieDetail,
      {
        new: true,
      }
    );

    if (updateMovie) {
      res
        .status(200)
        .json({ message: "Movie updated successfully", updateMovie });
    } else {
      res.status(404).json({ error: "Movie not found" });
    }
  } catch (error) {
    res.status(500).json({ error: "Internal server error" });
  }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
