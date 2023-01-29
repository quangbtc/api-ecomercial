import mongoose from 'mongoose';

const ProductSchema = new mongoose.Schema(
    {
        title: { type: String, required: true, unique: true },
        desc: { type: String },
        categories: { type: Array },
        color: [{ value: { type: String }, label: { type: String } }],
        img: { type: String },
        thumbs: { type: Array },
        size: [{ value: { type: String }, label: { type: String } }],
        price: { type: Number },
        content: { type: String },
        saleOff: { type: Number, default: 0 },
        inStock: { type: Number },
    },
    { timestamps: true },
);
export default mongoose.model('Product', ProductSchema);
