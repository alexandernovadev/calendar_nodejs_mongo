const express = require("express");
require("dotenv").config();
const app = express();

// console.log(process.env);

// Routes

app.use(express.static("public"));

app.use(express.json())

app.use("/api/auth", require("./routes/auth"));

const PORT = process.env.PORT || 3020;
app.listen(PORT, () => {
  console.log(`APP running on port: ${PORT}`);
});
