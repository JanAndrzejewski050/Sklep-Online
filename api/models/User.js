const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");

const userSchema = new mongoose.Schema(
    {
      name: { type: String, required: true },
      email: { type: String, required: true, unique: true },
      password: { type: String, required: true },
      isAdmin: {
        type: Boolean,
        default: false,
      },
    },
    { timestamps: true }
  );

//walidacja hasła
userSchema.methods.matchPassword = async function(enteredPassword) {
  return await bcrypt.compare(enteredPassword,this.password);
}

  module.exports = mongoose.model("User", userSchema);
  