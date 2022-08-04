const express = require("express");
const dbConection = require("./db/config");
require("dotenv").config();
const cors = require("cors");
const app = express();

// DB
dbConection();

// console.log(process.env);
app.use(express.static("public"));
app.use(express.json());
app.use(cors());

// Routes
app.use("/api/auth", require("./routes/auth"));
app.use("/api/events", require("./routes/events"));

const PORT = process.env.PORT || 3020;
app.listen(PORT, () => {
  console.log(`APP running on port: ${PORT}`);
});
