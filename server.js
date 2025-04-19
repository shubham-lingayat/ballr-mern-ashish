import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";
import User from "./models/User.js";
import Booking from "./models/Booking.js";

dotenv.config(); //loads data from your .env.
const app = express();  //initilise express server


// Allow only your frontend URL
app.use(cors({
  origin: 'https://ballr-table-booking.vercel.app',
  credentials: true // if you're using cookies or HTTP auth
}));

app.use(express.json()); // parser incomming json request


// MongoDB Connection
// connect your DB and fetch url from.env file
mongoose.connect(process.env.MONGO_URL)
// logs success or error message
.then(() => console.log("✅ MongoDB connected"))
.catch((err) => console.error("❌ DB Connection Error:", err));


// POST: Register
app.post("/register", async (req, res) => {
  try {
    const newUser = new User(req.body);
    await newUser.save();
    res.status(201).json({
      message: "User registered successfully!"
    });
  } catch (error) {
    console.error("Error saving user:", error);
    res.status(500).json({
      message: "Server error. Please try again later."
    });
  }
});

// POST: Login
app.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;

    // Check if user exists
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: "Invalid email or password." });
    }

    // Check password (since it's plaintext right now — ideally you'd hash it)
    if (user.password !== password) {
      return res.status(400).json({ message: "Invalid email or password." });
    }

    // On success
    res.status(200).json({
      message: "Login successful",
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        contactNumber: user.contactNumber,
        accountType: user.accountType,
        isActive: user.isActive,
      }
    });

  } catch (error) {
    console.error("Login error:", error);  // Keep this
    res.status(500).json({
      message: error.message || "Server error during login. Please try again later."
    });
  }  
});


//Get Api 
app.get("/getallusers", async (req, res) => {
  try {
    const allUsers = await User.find();  // 👈 added await

    if (!allUsers || allUsers.length === 0) {
      return res.status(400).json({
        success: false,
        message: "No User Found"
      });
    }

    return res.status(200).json({
      success: true,
      message: "All users fetched successfully",
      data: allUsers
    });

  } catch (err) {
    return res.status(500).json({
      success: false,
      message: "Can Not fetch internal server error"
    });
  }
});

// Update isActive 
app.put("/update-status/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const { isActive } = req.body;

    const updatedUser = await User.findByIdAndUpdate(id, { isActive }, { new: true });

    if (!updatedUser) {
      return res.status(404).json({ success: false, message: "User not found" });
    }

    res.status(200).json({ success: true, message: "Status updated", data: updatedUser });

  } catch (error) {
    console.error("Update status error:", error);
    res.status(500).json({ success: false, message: "Internal server error" });
  }
});

// Delete User
// DELETE: Delete a user by ID
app.delete("/delete-user/:userId", async (req, res) => {
  try {
    const { userId } = req.params;

    const deletedUser = await User.findByIdAndDelete(userId);

    if (!deletedUser) {
      return res.status(404).json({
        success: false,
        message: "User not found"
      });
    }

    res.status(200).json({
      success: true,
      message: "User deleted successfully",
      data: deletedUser
    });

  } catch (error) {
    console.error("Delete user error:", error);
    res.status(500).json({
      success: false,
      message: "Internal server error"
    });
  }
});

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// Booking Api
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//01 : Create New Booking
// POST: Create new booking
app.post("/create-booking", async (req, res) => {
  try {
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
});



//Get Api 
app.get("/getallbookings", async (req, res) => {
  try {
    const allBookings = await Booking.find();  // 👈 added await

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
});


// DELETE Booking: Delete a user by ID
app.delete("/delete-booking/:bookingId", async (req, res) => {
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
});

app.get("/", (req, res) => {
  res.send("Server is up and running!");
});


// Server listening
const PORT = process.env.PORT || 4209;
app.listen(PORT, () => console.log(`✅ Server running on port ${PORT}`));  
