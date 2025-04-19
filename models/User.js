import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  contactNumber: { type: String, required: true },
  email: { type: String, required: true },
  password: { type: String, required: true },
  accountType: { type: String, required: true },
  isActive: { type: Boolean, default: true },
});

const User = mongoose.model("User", userSchema);
export default User;
