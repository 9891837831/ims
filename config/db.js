const mongoose = require("mongoose");
require("dotenv").config();

const dbURL = process.env.db_Url;

mongoose.connect(dbURL, {
  useNewUrlParser: true,
  useUnifiedTopology: true
});

const db = mongoose.connection;

db.on("error", (err) => {
  console.error("Database Connection Error", err);
});

db.once("open", () => {
  console.log("Database Connected");
});
