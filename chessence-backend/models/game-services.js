import mongoose from "mongoose";
import gameModel from "./game.js";

import dotenv from "dotenv";

dotenv.config();

mongoose.set("debug", true);

mongoose.connect(process.env.MONGODB_URI);

async function getGames(id) {
    let result;
    if (id) {
        result = await findGamesByUserId(id);
    } else {
        result = await gameModel.find();
    }
    return result;
}

async function findGamesByUserId(userId) {
    try {
        return await gameModel.find({
            $or: [{ blackID: userId }, { whiteID: userId }],
        });
    } catch (error) {
        console.log(error);
        return undefined;
    }
}

async function addGame(game) {
    // try {
    const gameToAdd = new gameModel(game);
    const savedGame = await gameToAdd.save();
    return savedGame;
    // } catch (error) {
    //     console.log(error);
    //     return false;
    // }
}

async function deleteGame(id) {
    // try {
    await gameModel.findByIdAndDelete(id);
    return true;
    // } catch (error) {
    //     console.log(error);
    //     return false;
    // }
}

export default {
    getGames,
    addGame,
    deleteGame,
};
