import mongoose from "mongoose";
import gameModel from "./game.js";

import dotenv from "dotenv";
import game from "./game.js";

dotenv.config();

mongoose.set("debug", true);

mongoose.connect(process.env.MONGODB_URI);

async function getGames(id) {
    let result;
    if (id) {
        result = await findGameById(id);
    } else {
        result = await gameModel.find();
    }
    return result;
}

async function findGameById(id) {
    const game = await gameModel.findById(id);

    if (!game) {
        return false;
    }
    return game;
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
    return await gameModel.findByIdAndDelete(id);
}

export default {
    getGames,
    addGame,
    deleteGame,
};
