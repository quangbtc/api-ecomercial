import mongoose from "mongoose";
const CartSchema = new mongoose.Schema(
  {
    userId: { type: String, required: true, unique: true },
    products: [
      {
        productId: { type: String },
        qty: { type: Number, default: 1 },
      },
    ],
  },
  { timestamps: true }
);
export default  mongoose.model("Cart", CartSchema);
