import mongoose from "mongoose";

const userModel = new mongoose.Schema({
    name: {
        type: String, 
        required: [true, "Please Provide an Username"], 
    }, 
    email: {
        type: String, 
        required: [true, "Please Provide a Valid Email Address"], 
        unique: true, 
    }, 
    password: {
        type: String, 
        required: [true, "Please Provide a Strong Password"], 
    }, 
    is_verified: {
        type: Boolean, 
        default: false
    }, 
    verificationToken: String, 
    verificationExpiryDate: Date, 
    passwordResetToken: String, 
    passwordResetTokenExpiryDate: Date
})

const User = mongoose.models.User || mongoose.model("User", userModel, 'users');

export default User;