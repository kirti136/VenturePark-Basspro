const { Router } = require("express");
const { UserModel } = require("../Models/user.model");

const userRouter = Router();

// get
userRouter.get("/", async (req, res) => {
  try {
    const users = await UserModel.find();
    res.status(200).send({ users: users });
  } catch (error) {
    res.status(400).send({ message: error.message });
  }
});

// Register User
userRouter.post("/register", async (req, res) => {
  const payload = req.body;
  try {
    const user = new UserModel(payload);
    await user.save();
    res.status(200).send({ message: "User Registered Successfully" });
  } catch (error) {
    res.status(400).send({ message: error.message });
  }
});

// Login User 
userRouter.post("/login", async (req, res) => {
  // const { email, password } = req.body
  try {
    const user = await UserModel.findOne(req.body);
    if (user) {
    } else {
      res.status(404).send({ message: "User not found" });
    }
    // res.status(200).send("Login Successfully")
  } catch (error) {
    res.status(400).send({ message: error.message });
  }
});

module.exports = {
  userRouter,
};
