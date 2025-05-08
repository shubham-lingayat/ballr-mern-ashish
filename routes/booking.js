const express = require("express");
const router = express.Router();
const {createBooking, getBookingsByDate, deleteBookingById} = require('../controllers/Booking');

// Booking Routes
router.post("/create-booking", createBooking);
router.get("/getallbookings", getBookingsByDate);
router.delete("/delete-booking/:bookingId", deleteBookingById);

module.exports = router;