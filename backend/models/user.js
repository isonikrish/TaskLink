import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  username: {
    type: String,
  },
  email: {
    type: String,
    required: true,
  },
  profilePic: {
    type: String,
    default: "",
  },
  password: {
    type: String,
    required: true,
  },
});


const User = mongoose.model("User", userSchema);
export default User;