const express = require("express");
const app = express(); //initilise express server
const cors = require("cors");

// import dtenv
require("dotenv").config();
const PORT = process.env.PORT || 4209;


// Middlewares
app.use(cors()); // allow request from any domain
app.use(express.json()); // parser incomming json request

// Route import and mount
const user = require("./routes/user");
const booking = require("./routes/booking");
app.use("/api/v1", user );
app.use("/api/v1",booking);


// import databse file
require("./config/database").Connect();

// Server listening
app.listen(PORT, () => {
  console.log(`✅ Server running on port ${PORT}`);
});

app.get('/', (req, res) => {
  res.send('Server is alive!');
});
