// import React, { useState, useEffect } from "react";
// import axios from "axios";
// import { FaArrowCircleLeft, FaArrowCircleRight } from "react-icons/fa";
// import GameEntry from "../Games/GameEntry";
// import "./gameList.css";

// export default function GameList(props) {
//     const [usernames, setUserNames] = useState([]);
//     const [startIndex, setStartIndex] = useState(0);

//     async function getUserName(id) {
//         try {
//             const response = await axios.get(
//                 "https://chessence.azurewebsites.net/users/" + id
//             );
//             return response.data.username;
//         } catch (error) {
//             // Handle errors. Logging into the console for now.
//             console.log(error);
//             return false;
//         }
//     }

//     useEffect(() => {
//         const fetchUsernames = async () => {
//             const usernamePromises = props.gameData.map(async (row) => {
//                 const black = await getUserName(row.whiteID);
//                 const white = await getUserName(row.blackID);
//                 const winner = await getUserName(row.winner);
//                 return { black, white, winner };
//             });

//             const resolvedUsernames = await Promise.all(usernamePromises);
//             setUserNames(resolvedUsernames);
//         };

//         fetchUsernames();
//     }, [props.gameData]);

//     const pageSize = 6;
//     const totalPages = Math.ceil(props.gameData.length / pageSize);

//     const handleNextPage = () => {
//         setStartIndex((prevIndex) =>
//             Math.min(prevIndex + pageSize, props.gameData.length - pageSize)
//         );
//     };

//     const handlePrevPage = () => {
//         setStartIndex((prevIndex) => Math.max(prevIndex - pageSize, 0));
//     };

//     const displayedGames = props.gameData.slice(
//         startIndex,
//         startIndex + pageSize
//     );

//     return (
//         <div id="gameList">
//             {displayedGames.map((row, index) => (
//                 <GameEntry
//                     gameId={row._id}
//                     key={index}
//                     score={row.score}
//                     player1={usernames[index].white}
//                     player2={usernames[index].black}
//                     winner={usernames[index].winner}
//                     date={row.date}
//                     onClick={props.clickEvent}
//                 />
//             ))}
//             <div className="pagination">
//                 <button onClick={handlePrevPage} disabled={startIndex === 0}>
//                     <FaArrowCircleLeft />
//                 </button>
//                 <button
//                     onClick={handleNextPage}
//                     disabled={startIndex + pageSize >= props.gameData.length}
//                 >
//                     <FaArrowCircleRight />
//                 </button>
//             </div>
//         </div>
//     );
// }

import GameEntry from "../Games/GameEntry";
import "./gameList.css";

export default function GameList(props) {
    const games = [
        {
            score: "0 - 1",
            player1: "John",
            player2: "Charlie",
            date: "10/9/23",
        },
        { score: "1 - 0", player1: "John", player2: "Will", date: "11/9/23" },
    ];

    return (
        <div id="gameList">
            {games.map((game, index) => (
                <GameEntry
                    gameId={index}
                    key={index}
                    score={game.score}
                    player1={game.player1}
                    player2={game.player2}
                    date={game.date}
                    onClick={props.clickEvent}
                />
            ))}
        </div>
    );
}
