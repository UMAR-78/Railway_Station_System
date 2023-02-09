const express = require("express");
const Router = express.Router();

const { addTrain, deleteTrain , updateTrain ,getAllTrains} = require('../controllers/trainController');
const { protect } = require("../middleware/authMiddleware");




Router.post("/train", addTrain);
Router.delete("/delete/train/:id", deleteTrain);
Router.put("/update/train/:id", updateTrain);
Router.get("/trains", getAllTrains);




module.exports =  Router
