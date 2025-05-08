const express = require("express");
const router = express.Router();
// Handlers
const {register, login, getAllUser, updateIsActive, deleteUserById} = require('../controllers/User');

// User Routes
router.post("/register", register);
router.post("/login", login);
router.get("/getallusers", getAllUser);
router.put("/update-status/:id", updateIsActive);
router.delete("/delete-user/:userId", deleteUserById);

module.exports = router;