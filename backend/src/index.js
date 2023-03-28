const express = require("express");
require("dotenv").config();
const { connectionDB } = require("./db");

const app = express();

app.listen(process.env.PORT, async () => {
  await connectionDB();
  console.log(`Server listening on port ${process.env.PORT}`);
});
