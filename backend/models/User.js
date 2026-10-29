import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    name:{
        type:String,
        default:""
    },
    firstName:{
        type:String,
        default:""
    },
    lastName:{
        type:String,
        default:""
    },
    email:{
        type:String,
        required:true,
        unique:true
    },
    password:{
        type:String,
        required:true
    },
    phone:{
        type:String,
        default:""
    },
    addresses: [{
        country: { type: String },
        firstName: { type: String },
        lastName: { type: String },
        address: { type: String },
        apartment: { type: String },
        suburb: { type: String },
        state: { type: String },
        postcode: { type: String },
        isDefault: { type: Boolean, default: false }
    }],
    role: {
        type: String,
        enum: ['user', 'admin'],
        default: 'user'
    }
}, { timestamps: true });

const User = mongoose.model("User", userSchema);
export default User;