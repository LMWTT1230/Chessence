import React, { useState, useEffect } from "react";
import axios from "axios";
import GameEntry from "../Games/GameEntry";
import "./gameList.css";

export default function GameList(props) {

  const [usernames, setUserNames] = useState([]); 

  async function getUserName(id){
    try {
       const response = await axios.get('https://chessence.azurewebsites.net/users/'+id);
       return response.data.username;     
    }
    catch (error){
       //We're not handling errors. Just logging into the console.
       console.log(error); 
       return false;         
    }
 }

  useEffect(() => {
    const fetchUsernames = async () => {
      const usernamePromises = props.gameData.map(async (row) => {
        const black = await getUserName(row.whiteID);
        const white = await getUserName(row.blackID);
        const winner = await getUserName(row.winner);
        return [black, white, winner];
      });

      const resolvedUsernames = await Promise.all(usernamePromises);
      setUserNames(resolvedUsernames);
    };

    fetchUsernames();
  }, [props.gameData]);

  return (
    <div id="gameList">
      {props.gameData.map((row, index) => (
        <GameEntry
          gameId={row._id}
          key={index}
          score={row.score}
          player1={usernames[index].white}
          player2={usernames[index].black}
          winner={usernames[index].winner}
          date={row.date}
          onClick={props.clickEvent}
        />
      ))}
    </div>
  );
}