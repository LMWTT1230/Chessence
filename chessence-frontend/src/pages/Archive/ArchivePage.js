import axios from "axios";
import React, { useState, useEffect } from "react";
import "./archive.css";
import GameList from "./GameList/GameList.js";
import GameMove from "./Moves/GameMove.js";

export default function ArchivePage() {
    //const [games, setGames] = useState([]);

    // async function fetchAll(){
    //     try {
    //        const response = await axios.get('http://localhost:8000/archive');
    //        return response.data.game_list;
    //     }
    //     catch (error){
    //        //We're not handling errors. Just logging into the console.
    //        console.log(error);
    //        return false;
    //     }
    //  }
  
     //useEffect(() => {
    //    fetchAll().then( result => {
    //      if (result)
    //          setGames(result);
    //    });
    //  }, [] );
  

    const [showMove, setShowMove] = useState(false);
    const [gameId, setGameId] = useState(0);

    function toggleMove(newGId) {
        if(newGId === gameId){
            setShowMove(!showMove);
        }
        else {
            setShowMove(true);
        }
        
        setGameId(newGId)
    }

    return (
        <div id="archivePage">
        //<GameList game={games} clickEvent={toggleMove}/>
        //{showMove && <GameMove />}
            <h1>games</h1>
            <div id="archiveContent">
                <GameList clickEvent={toggleMove} />
                {showMove && <GameMove/>}
            </div>
        </div>
    );
}
