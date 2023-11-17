import mongoose from "mongoose";

const GameSchema = new mongoose.Schema(
    {
        blackID: {
            type: String,
            required: true,
            trim: true,
        },
        whiteID: {
            type: String,
            required: true,
            trim: true,
        },
        gameHistory: {
            type: String,
            required: true,
            trim: true,
        },
        date: {
            type: Date,
            required: true,
            trim: true,
        },
        rules: {
            type: String,
            required: true,
            trim: true,
        },
    },
    { collection: "game" }
);

export default mongoose.model("Game", GameSchema);
