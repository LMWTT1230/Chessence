import axios from "axios";
import React, { useState, useEffect } from "react";
import "./archive.css";
import GameList from "./GameList/GameList.js";
import GameMove from "./Moves/GameMove.js";
import ArchiveBoard from "./ArchiveBoard/ArchiveBoard.js";

export default function ArchivePage() {
    const [games, setGames] = useState([]);
    const [showMove, setShowMove] = useState(false);
    const [gameId, setGameId] = useState(0);

    async function fetchAll() {
        try {
            const response = await axios.get(
                "https://chessence.azurewebsites.net/history"
            );
            return response.data.games_list;
        } catch (error) {
            //We're not handling errors. Just logging into the console.
            console.log(error);
            return false;
        }
    }

    useEffect(() => {
        fetchAll().then((result) => {
            if (result) setGames(result);
        });
    }, []);

    function toggleMove(newGId) {
        if (newGId === gameId) {
            setShowMove(!showMove);
        } else {
            setShowMove(true);
        }

        setGameId(newGId);
    }

    const selectedGame = games.find((game) => game._id === gameId);

    return (
        <div id="archivePage">
            <h1>games</h1>
            <div id="archiveContent">
                <GameList gameData={games} clickEvent={toggleMove} />
                {showMove && (
                    <ArchiveBoard history={selectedGame.gameHistory} />
                )}
            </div>
        </div>
    );

    //<GameList game={games} clickEvent={toggleMove}/>
    //{showMove && <GameMove />}
}
