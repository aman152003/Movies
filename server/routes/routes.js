const express = require("express");
const User = require("../models/user");
const router = express.Router();
const verifyLogin = require("../middleware/verifyLogin");
const Watchlist = require("../models/watchlist");
const Favourite = require("../models/favourite");

router.post("/watchlist", verifyLogin, async (req, res) => {
  const { image, releaseDate, title, userScore, userId, id, type } = req.body;
  if (
    !image ||
    !releaseDate ||
    !userScore ||
    !userId ||
    !title ||
    !id ||
    !type
  ) {
    res.status(400).json({ message: "Some data was missing" });
  } else {
    const isAlreadyAdded = await Watchlist.findOne({
      title: title,
      userId: userId,
    });
    if (isAlreadyAdded) {
      res.status(400).json({ error: "Already added to favourites" });
    } else {
      const item = new Watchlist({
        image,
        releaseDate,
        title,
        userScore,
        userId,
        id,
        type,
      });
      item.save();
      res.json({ message: "Added to Watchlist" });
    }
  }
});

router.get("/watchlist", verifyLogin, async (req, res) => {
  const watchlist = await Watchlist.find({ userId: req.user._id });
  res.json({ myWatchlist: watchlist });
});

router.post("/favourites", verifyLogin, async (req, res) => {
  const { image, releaseDate, title, userScore, userId, id, type } = req.body;
  if (
    !image ||
    !releaseDate ||
    !userScore ||
    !userId ||
    !title ||
    !id ||
    !type
  ) {
    res.status(400).json({ error: "Some data was missing" });
  } else {
    const isAlreadyAdded = await Favourite.findOne({
      title: title,
      userId: userId,
    });
    if (isAlreadyAdded) {
      res.status(400).json({ error: "Already added to favourites" });
    } else {
      const item = new Favourite({
        image,
        releaseDate,
        title,
        userScore,
        userId,
        id,
        type,
      });
      item.save();
      res.json({ message: "Added to Favourites" });
    }
  }
});

router.get("/favourites", verifyLogin, async (req, res) => {
  const favourites = await Favourite.find({ userId: req.user._id });
  res.json({ myFavourites: favourites });
});

router.delete("/watchlist", verifyLogin, async (req, res) => {
  const { title, userId } = req.body;
  if (!title || !userId) {
    res.status(400).json({ error: "Some data was missing" });
  } else {
    const deletedItem = await Watchlist.findOne({
      title: title,
      userId: userId,
    });
    deletedItem.remove();
  }
});

router.delete("/favourites", verifyLogin, async (req, res) => {
  const { title, userId } = req.body;
  if (!title || !userId) {
    res.status(400).json({ error: "Some data was missing" });
  } else {
    const deletedItem = await Favourite.findOne({
      title: title,
      userId: userId,
    });
    deletedItem.remove();
  }
});

module.exports = router;
