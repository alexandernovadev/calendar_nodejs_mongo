const express = require("express");
const dbConection = require("./db/config");
require("dotenv").config();
const app = express();

// DB 
dbConection();

// console.log(process.env);
app.use(express.static("public"));
app.use(express.json())

// Routes
app.use("/api/auth", require("./routes/auth"));

const PORT = process.env.PORT || 3020;
app.listen(PORT, () => {
  console.log(`APP running on port: ${PORT}`);
});
