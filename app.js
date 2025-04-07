const express = require("express");
const mongoose = require("mongoose");
const cookieParser = require("cookie-parser");
const morgan = require("morgan");
const authRoutes = require("./routes/authRoutes");
const orderRoutes = require("./routes/orderRoutes");
const { errorHandler } = require("./middleware/errorHandler");

const app = express();

// Middleware
app.use(express.json());
app.use(cookieParser());
app.use(morgan("combined"));

// Routes
app.use("/auth", authRoutes);
app.use("/orders", orderRoutes);

// Error Handling Middleware
app.use(errorHandler);

// Connect to MongoDB and start server
mongoose
  .connect("mongodb://localhost:27017/orderdb", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    app.listen(3000, () => console.log("Server running on port 3000"));
  })
  .catch((err) => console.log(err));
