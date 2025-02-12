import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "name is required"],
      trim: true,
      minLength: 2,
      maxLength: 50,
    },

    email: {
      type: String,
      required: [true, "Email is required"],
      unique: true,
      toLowerCase: true,
      trim: true,
      minLength: 5,
      maxLength: 255,
      match: [/\S+@\S+\.\S+/, "Please enter a valid email address"],
    },

    password: {
      type: String,
      required: [true, "Password is required"],
      minLength: 8,
      maxLength: 255,
    },
  },
  { timestamps: true },
);

const User = mongoose.model("User", userSchema);

export default User;
