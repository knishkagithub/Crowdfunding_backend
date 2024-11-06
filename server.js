const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const bcrypt = require("bcryptjs");
// const jwt = require("jsonwebtoken");
// const cookieParser = require("cookie-parser");
//  const User = require("./models/User");

const app = express();
app.use(express.json());

// app.use(cookieParser());

// CORS configuration
const corsOptions = {
  origin: 'http://localhost:3000', // Replace with your frontend URL
  credentials: true,
};
app.use(cors(corsOptions));
const userRouter = require("./routes/user");
app.use("/users", userRouter);
const campaignsRouter = require("./routes/campaigns");
app.use("/campaigns", campaignsRouter);

const accessTokenSecret = "Y19UuF1Ktwwk9uz6";
const refreshTokenSecret = "Y19UuF1Ktwwk9uz6";
let refreshTokens = [];

// MongoDB connection
mongoose.connect('mongodb://localhost:27017/fundbridge', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
  .then(() => {
    console.log('Connected to MongoDB');
  })
  .catch((error) => {
    console.error('Error connecting to MongoDB:', error);
  });

const PORT = process.env.PORT || 5000;
app.listen(PORT, () =>{ console.log(`Server running on port: ${PORT}`)});
