import mongoose from "mongoose";

const bookingSchema = new mongoose.Schema({
  tableNo : {type: String, required : true},
  prName : { type : String, required : true},
  guestName : {type : String, required : true},
  guestQuantity : {type : Number, required : true},
  bookedDate : {type : String , required : true},
  currDate : {type : String , required : true},
  booked : {type : Boolean, required : true}
})

const Booking = mongoose.model("Booking", bookingSchema);
export default Booking; 