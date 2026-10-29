import mongoose from "mongoose";

const productSchema = new mongoose.Schema({
    name: { type: String, required: true },
    brand: { type: String, required: true },
    price: { type: Number, required: true },
    images: [{ type: String, required: true }],
    category: { type: String, required: true },
    description: { type: String, default: "" },
    colors: [{ type: String }],
    inStock: { type: Boolean, default: true },
    isFeatured: { type: Boolean, default: false },
    isNewArrival: { type: Boolean, default: false },
    isBestSeller: { type: Boolean, default: false },
    countdown: {
        days: Number,
        hours: Number,
        mins: Number,
        secs: Number
    },
    sizes: [{ type: String }],
    material: { type: String, default: "" },
    productType: { type: String, default: "" },
    tags: [{ type: String }]
}, { timestamps: true });

const Product = mongoose.model("Product", productSchema);
export default Product;
