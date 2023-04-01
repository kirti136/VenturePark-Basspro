const { Router } = require("express");
const { UserModel } = require("../Models/user.model");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

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
  const { name, email, password } = req.body;

  try {
    bcrypt.hash(password, 5, async (err, hash) => {
      if (hash) {
        const user = new UserModel({ name, email, password: hash });
        await user.save();
        res.status(200).send({ message: "Registration successful" });
      } else {
        res.status(400).send({ message: "Registration Failed", error: err });
      }
    });
  } catch (error) {
    res.status(400).send({ message: "Registration Failed", error: error.message });
  }
});

// Login User
userRouter.post("/login", async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await UserModel.findOne({ email });

    if (user) {
      bcrypt.compare(password, user.password, (err, result) => {
        if (result) {
          res.status(200).send({
            message: "Login successful",
            token: jwt.sign({ userID: user._id }, "hello"),
          });
        } else {
          res.status(400).send({ message: "Wrong Password" });
        }
      });
    } else {
      res.status(400).send({ message: "Email Not Found" });
    }
  } catch (error) {
    res.status(400).send({ message: "Login Failed", error: error.message });
  }
});

// Update user
userRouter.patch("/update/:userID", async (req, res) => {
  const { userID } = req.params;
  const payload = req.body;

  try {
    await UserModel.findByIdAndUpdate({ _id: userID }, payload);
    res.status(200).send({ message: "User Updated" });
  } catch (error) {
    res.status(400).send({ message: error.message });
  }
});

// Delete
userRouter.delete("/delete/:userID", async (req, res) => {
  const userID = req.params.userID;

  try {
    await UserModel.findByIdAndDelete({ _id: userID });
    res.status(200).send({ message: "User Deleted" });
  } catch (error) {
    res.status(400).send({ message: error.message });
  }
});

module.exports = {
  userRouter,
};
