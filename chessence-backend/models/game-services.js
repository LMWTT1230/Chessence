import mongoose from "mongoose";
import gameModel from "./game.js";

import dotenv from "dotenv";

dotenv.config();

mongoose.set("debug", true);

// mongoose.connect(
//     "mongodb+srv://" +
//         process.env.MONGO_USER +
//         ":" +
//         process.env.MONGO_PWD +
//         "@" +
//         process.env.MONGO_CLUSTER +
//         "/" +
//         process.env.MONGO_DB +
//         "?retryWrites=true&w=majority",
//     {
//         useNewUrlParser: true,
//         useUnifiedTopology: true,
//     }
// );

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
    try {
        return await gameModel.findById(id);
    } catch (error) {
        console.log(error);
        return undefined;
    }
}

async function addGame(game) {
    try {
        const gameToAdd = new gameModel(game);
        const savedGame = await gameToAdd.save();
        return savedGame;
    } catch (error) {
        console.log(error);
        return false;
    }
}

async function deleteGame(id) {
    try {
        await gameModel.findByIdAndDelete(id);
        return true;
    } catch (error) {
        console.log(error);
        return false;
    }
}

export default {
    getGames,
    addGame,
    deleteGame,
};
