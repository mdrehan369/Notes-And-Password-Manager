import mongoose from 'mongoose';
import bcryptjs from "bcryptjs";

const vaultSchema = new mongoose.Schema({

    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
    },

    name: {
        type: String,
        required: true,
        lowercase: true,
        trim: true,
    },

    password: {
        type: String,
        required: true,
        trim: true,
        minlength: 8,
    }

}, { timestamps: true });

vaultSchema.pre("save", async function (next) {
    if(this.isModified("password")) {
        this.password = await bcryptjs.hash(this.password, 10);
    }
    next();
});

vaultSchema.methods.comparePassword = function (password) {
    return bcryptjs.compare(password, this.password);
};

export const vaultModel = new mongoose.model("Vault", vaultSchema);