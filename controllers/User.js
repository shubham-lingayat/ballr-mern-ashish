const User = require("../models/User");

// Register route handler
exports.register = async (req, res) => {
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
};

// Login
exports.login = async (req, res) => {
    try {
        const { email, password } = req.body;
    
        // Check if user exists
        const user = await User.findOne({ email });
        if (!user) {
          return res.status(400).json({ message: "Invalid email." });
        }
    
        // Check password (since it's plaintext right now — ideally you'd hash it)
        if (user.password !== password) {
          return res.status(400).json({ message: "Invalid password." });
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
};

// Get users data
exports.getAllUser = async(req,res)=>{
    try {
        const allUsers = await User.find();  
    
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
}

// Update isActive of Pr
exports.updateIsActive = async (req,res) =>{
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
}

// Delete User 
exports.deleteUserById = async(req,res) =>{
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
}