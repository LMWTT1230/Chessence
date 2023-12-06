import React, { useState, useEffect } from "react";
import axios from "axios";
import { FaArrowCircleLeft, FaArrowCircleRight } from "react-icons/fa";
import GameEntry from "../Games/GameEntry";
import "./gameList.css";

export default function GameList(props) {
    const [usernames, setUserNames] = useState([]);
    const [startIndex, setStartIndex] = useState(0);

    async function getUserName(id) {
        try {
            const response = await axios.get(
                process.env.REACT_APP_BACKEND + "/users/" + id
            );
            return response.data.username;
        } catch (error) {
            // Handle errors. Logging into the console for now.
            console.log(error);
            return false;
        }
    }

    async function fetchUsernames() {
        const users = [];
    
        for (const row of props.gameData) {
            const white = await getUserName(row.whiteID);
            const black = await getUserName(row.blackID);
            const winner = await getUserName(row.winner);
    
            users.push({ white, black, winner });
        }
    
        return users;
    }

    useEffect(() => {
        fetchUsernames().then((result) => {
            if (result) setUserNames(result);
        });
    }, []);

    const pageSize = 6;

    const handleNextPage = () => {
        setStartIndex((prevIndex) =>
            Math.min(prevIndex + pageSize, props.gameData.length - pageSize)
        );
    };

    const handlePrevPage = () => {
        setStartIndex((prevIndex) => Math.max(prevIndex - pageSize, 0));
    };

    const displayedGames = props.gameData.slice(
        startIndex,
        startIndex + pageSize
    );

    return (
        <div id="gameList">
            {displayedGames.map((row, index) => (
                <GameEntry
                    gameId={row._id}
                    key={index}
                    player1={usernames[index] ? usernames[index].white : 'Will'}
                    player2={usernames[index] ? usernames[index].black : 'Frank'}
                    winner={usernames[index] ? usernames[index].winner : 'Will'}
                    date={new Date(row.date).toLocaleDateString()}
                    onClick={props.clickEvent}
                />
            ))}
            <div className="pagination">
                <button onClick={handlePrevPage} disabled={startIndex === 0}>
                    <FaArrowCircleLeft />
                </button>
                <button
                    onClick={handleNextPage}
                    disabled={startIndex + pageSize >= props.gameData.length}
                >
                    <FaArrowCircleRight />
                </button>
            </div>
        </div>
    );
}
