const mongoose = require("mongoose");

const FavouriteSchema = new mongoose.Schema({
  image: {
    type: String,
    required: true,
  },
  releaseDate: {
    type: String,
    required: true,
  },
  title: {
    type: String,
    required: true,
  },
  type: {
    type: String,
    required: true,
  },
  userScore: {
    type: Number,
    required: true,
  },
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  id: {
    type: Number,
    required: true,
  },
});

const Favourite = mongoose.model("Favourite", FavouriteSchema);

module.exports = Favourite;
