const express = require("express");
const { addNewTimeTable, updateTimeTable, deleteTimeTable, getAllTimeTables } = require("../controllers/timeTableController");
const { singleUpload } = require("../middleware/multer");
const Router = express.Router();

 


// Add new station
Router.post("/timeTable",singleUpload  ,  addNewTimeTable);
Router.put("/update/timeTable/:id", updateTimeTable);
Router.delete("/delete/timeTable/:id", deleteTimeTable);
Router.get("/timeTables", getAllTimeTables);







module.exports = Router;
