const mongoose = require('mongoose');

const bookingSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  timetableEntryId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'TimetableEntry',
    required: true,
  },
  numberOfSeats: {
    type: Number,
    required: true,
  },
  totalFare: {
    type: Number,
    required: true,
  },
 
  // Add other fields as needed
}, { timestamps: true });

const Booking = mongoose.model('Booking', bookingSchema);

module.exports = Booking;
