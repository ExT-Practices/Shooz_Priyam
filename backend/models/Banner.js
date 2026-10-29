import mongoose from "mongoose";

const bannerSchema = new mongoose.Schema({
    title: { type: String, required: true },
    subtitle: { type: String },
    description: { type: String },
    position: { type: String, default: 'left' },
    image: { type: String, required: true },
    link: { type: String, default: '/shop' },
    isActive: { type: Boolean, default: true }
}, { timestamps: true });

const Banner = mongoose.model("Banner", bannerSchema);
export default Banner;
