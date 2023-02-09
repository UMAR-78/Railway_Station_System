const mongoose = require("mongoose");

const trainSchema = new mongoose.Schema({
  trainNumber: { type: String, required: true, unique: true },
  trainName: { type: String, required: true },
  type: { type: String, enum: ["Express", "Local"], required: true },
  capacity: { type: Number, required: true },
  baseFare: { type: Number, required: true },
  additionalCharges: { type: Number, default: 0 },
});

module.exports = mongoose.model("Train", trainSchema);
