import mongoose from "mongoose";

const UserSchema = new mongoose.Schema(
  {
    // _id:{type:String},
    username: { type: String, required: true, unique: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    isAdmin: { type: Boolean, default: false },
    avatar:{type:String}
  },
  { timestamps: true }
);
export default mongoose.model("User", UserSchema);
