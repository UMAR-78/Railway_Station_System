const express = require("express");
const Router = express.Router();

const { AddNewStation, deleteStation ,updateStation, getAllStations} = require("../controllers/stationController");

const { protect } = require("../middleware/authMiddleware");




// Add new station
Router.post("/station", AddNewStation);
Router.delete("/station/delete/:id", deleteStation);
Router.put("/station/update/:id", updateStation);
Router.get("/stations", getAllStations);







module.exports = Router;
