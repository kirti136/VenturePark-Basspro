const mongoose = require("mongoose");

// Schema of Users to register
const userSchema = mongoose.Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
  },
  {
    versionKey: false,
  }
);

// Model of Users to register
const UserModel = mongoose.model("user", userSchema);

module.exports = {
  UserModel,
};
