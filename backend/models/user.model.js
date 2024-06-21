import mongoose from "mongoose";
import bcryptjs from "bcryptjs";
import jwt from "jsonwebtoken";
const userSchema = new mongoose.Schema({

    username: {
        type: String,
        required: true,
        trim: true,
        index: true,
        unique: true,
        lowercase: true,
    },

    password: {
        type: String,
        required: true,
        trim: true,
        minlength: 8,
    },

    email: {
        type: String,
        required: true,
        trim: true,
        unique: true,
        index: true,
    },

    name: {
        type: String,
        required: true,
        trim: true,
    }
    
}, { timestamps: true });

userSchema.pre("save", async function (next) {
    if(this.isModified("password")) {
        this.password = await bcryptjs.hash(this.password, 10);
    }
    next();
});

userSchema.methods.comparePassword = function (password) {
    return bcryptjs.compare(password, this.password);
};

userSchema.methods.generateAccessToken = function () {
    return jwt.sign(
        {
            user: this._id
        },
        process.env.JWT_SECRET_KEY,
        {
            expiresIn: process.env.JWT_SECRET_EXPIRES
        },
    )
}

export const userModel = new mongoose.model("User", userSchema);
