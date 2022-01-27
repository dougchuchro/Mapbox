const path = require("path");
const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
const connectDB = require("./config/db");
// ISS
const request = require("request");
const geojson = require("geojson");
var ISS_URL = "https://api.wheretheiss.at/v1/satellites/25544";

// load env vars
dotenv.config({ path: "./config/config.env" });

// Connect to database
connectDB();

const app = express();

// Body parser
app.use(express.json());

// Enable cors
app.use(cors());

// Set static folder
app.use(express.static(path.join(__dirname, "public")));

// Routes
app.use("/api/v1/stores", require("./routes/stores"));
app.use("/api/v1/geocoder", require("./routes/geocoder"));

const PORT = process.env.PORT || 5000;

app.listen(PORT, () =>
  console.log(`Server running in ${process.env.NODE_ENV} mode on port ${PORT}`)
);

app.get("/findiss", function (req, res) {
  request(ISS_URL, function (err, resp, body) {
    if (err) {
      console.log(err);
      res.status(400).json({ error: "Unable to contact ISS API" });
      return;
    }

    var apiResponse = JSON.parse(body);
    var issGeoJSON = geojson.parse([apiResponse], {
      Point: ["latitude", "longitude"],
    });
    //    console.log(issGeoJSON);
    res.json(issGeoJSON);
  });
});
