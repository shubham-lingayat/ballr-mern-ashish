const Booking = require("../models/Booking");
const User = require("../models/User");

// Create Booking
exports.createBooking = async (req, res) => {
    try {
        const {id} = req.body;
        const userDetails = await User.findById(id);
        if (userDetails.isActive === false){
          return res.status(200).json({
            success:true,
            isActive: false,
            messgae:"User not active"
          });
        }
        const newBooking = new Booking(req.body);
        await newBooking.save();
    
        res.status(201).json({
          success: true,
          message: "Booking created successfully!",
          data: newBooking
        });
      } catch (error) {
        console.error("Booking error:", error);
        res.status(500).json({
          success: false,
          message: "Internal server error"
        });
      }
};

// Get all bookings
exports.getBookingsByDate = async (req, res) => {
    try {
        const allBookings = await Booking.find(); 

        if (!allBookings || allBookings.length === 0) {
          return res.status(400).json({
            success: false,
            message: "No User Found"
          });
        }
    
        return res.status(200).json({
          success: true,
          message: "All Bookings fetched successfully",
          data: allBookings
        });
    
      } catch (err) {
        return res.status(500).json({
          success: false,
          message: "Can Not fetch internal server error"
        });
      }
};

// Delete Booking by ID
exports.deleteBookingById = async(req, res)=>{
    try {
       const { bookingId } = req.params;
   
       const deletedBooking = await Booking.findByIdAndDelete(bookingId);
   
       if (!deletedBooking) {
         return res.status(404).json({
           success: false,
           message: "User not found"
         });
       }
   
       res.status(200).json({
         success: true,
         message: "User deleted successfully",
         data: deletedBooking
       });
   
     } catch (error) {
       console.error("Delete user error:", error);
       res.status(500).json({
         success: false,
         message: "Internal server error"
       });
     }
   }