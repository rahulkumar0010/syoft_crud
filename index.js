const express = require("express");
const cors = require("cors");
const DBConnect = require("./config/db");
const userRoutes = require("./routes/user");
const productRoutes = require("./routes/product");
const errorHandler = require("./middlewares/errorHandler");
const { PORT } = require("./config");
// Database connection
DBConnect();

const app = express();
// for handling cross origin request
app.use(cors());
// handling req body
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
// handle static files
app.use("/uploads", express.static("uploads"));
// routes
app.use("/api/user", userRoutes);
app.use("/api/product", productRoutes);

const port = PORT || 4001;
// error handling
app.use(errorHandler);

app.listen(port, (err) => {
  if (err) console.log("Server connection error:", err);
  console.log(`Server is running on ${port}`);
});
