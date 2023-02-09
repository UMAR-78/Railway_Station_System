const mongoose = require('mongoose');

const timetableSchema = new mongoose.Schema({
  train: { type: mongoose.Schema.Types.Mixed, ref: 'Train', required: true },
  originStation: { type: mongoose.Schema.Types.Mixed, ref: 'Station', required: true },
  destinationStation: { type: mongoose.Schema.Types.Mixed, ref: 'Station', required: true },
  departureTime: { type: Date, required: true },
  arrivalTime: { type: Date, required: true },
  status: { type: String, enum: ['Scheduled', 'Delayed', 'Departed', 'Arrived'], default: 'Scheduled' },
  seatAvailability: { type: Number, default: 0 },
  maxSeats: { type: Number },
  totalFare:{ type: Number },
  image: {
    public_id: {
      type: String,
      required: true,
    },
    url: {
      type: String,
      required: true,
    },
  },
});

const Timetable = mongoose.model('Timetable', timetableSchema);

module.exports = Timetable;
