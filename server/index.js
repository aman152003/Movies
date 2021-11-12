const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const authRoutes = require("./routes/auth");
const routes = require("./routes/routes");
require("dotenv").config();

const app = express();
const PORT = process.env.PORT || 5000;

const connectDatabase = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URL, {
      useNewUrlParser: true,
      useFindAndModify: false,
      useUnifiedTopology: true,
    });
    console.log("MongoDB connection established");
  } catch (err) {
    console.log(err.message);
  }
};

connectDatabase();

app.use(express.json());

app.use(cors());

app.use(authRoutes);

app.use(routes);

app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});
