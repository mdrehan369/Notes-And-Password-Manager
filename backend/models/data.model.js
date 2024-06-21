import mongoose from "mongoose";

const dataSchema = new mongoose.Schema({

    vault: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Vault",
    },

    credentialType: {
        type: String,
        required: true,
        trim: true,
        enum: ["password", "key", "notes", "others"]
    },

    name: {
        type: String,
        required: true,
        trim: true,
        index: true
    },

    credential: {
        type: String,
        required: true,
        trim: true,
    }

}, { timestamps: true });

export const dataModel = new mongoose.model("Data", dataSchema);