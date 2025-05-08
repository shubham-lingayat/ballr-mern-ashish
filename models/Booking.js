const mongoose = require('mongoose');

const bookingSchema = new mongoose.Schema({
  tableNo: {
    type: String,
    required: true
  },
  prName: {
    type: String,
    trim:true,
    required: true
  },
  guestName: {
    type: String,
    trim:true,
    required: true
  },
  guestQuantity: {
    type: Number,
    required: true
  },
  bookedDate: {
    type: String,
    required: true
  },
  currDate: {
    type: String,
    required: true
  },
  booked: {
    type: Boolean,
    required: true
  }
})

const Booking = mongoose.model("Booking", bookingSchema);
module.exports = Booking;