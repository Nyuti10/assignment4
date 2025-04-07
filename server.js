const express = require("express");
const mongoose = require("mongoose");
const cookieParser = require("cookie-parser");
const logger = require("./middleware/logger");
const errorHandler = require("./middleware/errorHandler");

require("dotenv").config();

const app = express();

// Middlewares
app.use(express.json());
app.use(cookieParser());
app.use(logger);

// Routes
app.use("/auth", require("./routes/authRoutes"));
app.use("/orders", require("./routes/orderRoutes"));

// 404 Handler
app.use((req, res, next) => {
  res.status(404).json({ error: "Endpoint Not Found" });
});

// Centralized Error Handler
app.use(errorHandler);

// Connect MongoDB & Start Server
mongoose
  .connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() =>
    app.listen(process.env.PORT || 5000, () => console.log("Server running..."))
  )
  .catch((err) => console.log(err));
