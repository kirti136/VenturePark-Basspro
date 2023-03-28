const express = require("express");
require("dotenv").config();
const { connectionDB } = require("./db");
const cors = require("cors");
const { userRouter } = require("../Routes/user.route");

const app = express();

// Middlewares
app.use(express.json());
app.use(cors());
app.use("/users", userRouter);

app.get("/",(req,res)=>{
    res.send("Welcome to Venture Park")
})

//Server configuration
app.listen(process.env.PORT, async () => {
  await connectionDB();
  console.log(`Server listening on port ${process.env.PORT}`);
});
