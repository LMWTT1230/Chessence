import React, { useState, useEffect } from "react";
import { Chess } from "chess.js";
import './chessboard.css'; // Import your custom CSS file
import { Chessboard } from "react-chessboard";
import ScoreboardComponent from "./Scoreboard";
import GameResultPage from "./GameResultPage";
import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";



export default function Game() {
  const chess = new Chess(); 
  const game_fen = chess.fen();
  const game_turn = chess.turn();
  const [fen, setFen] = useState(game_fen);
  const [turn, setTurn] = useState(game_turn);
  // const [redirResults, setRedirectToResults] = useState(false);
  const navigate = useNavigate(); // Get the history object for navigation

  
  function onDrop(sourceSquare, targetSquare) {
    const move = {
      from: sourceSquare,
      to: targetSquare,
      promotion: "q", // always promote to a queen for example simplicity
    };

    try {      
      const newChess = new Chess(fen)
      newChess.move(move)
      const newFen = newChess.fen();
      console.log("in here")
      if(newChess.isGameOver()){
        console.log("in if");
        const playerColor = turn; 
        navigate("/results", { state : { winner: playerColor } }); // Navigate to the "/results" route
      }
      setFen(newFen); // Update the state with the new FEN
      const newTurn = newChess.turn();
      setTurn(newTurn);
    } catch (error) {
      console.log("Illegal move.") 
    }
  }


  const [windowDimension, detectHW] = useState({
    winWidth: window.innerWidth,
    winHeight: window.innerHeight,
  })
  const detectSize = () => {
    detectHW({
      winWidth: window.innerWidth,
      winHeight: window.innerHeight,
    })
  }
  useEffect(() => {
    window.addEventListener('resize', detectSize)

    return() => {
      window.removeEventListener('resize', detectSize)
    }
  }, [])

  const height_string = windowDimension.winHeight-63.5 + 'px'; // Convert to a string with 'px' appended
  
  return (
    <div id="ChessBoardPage">
      <div className="board-container" style={{ paddingTop: '0px', height: height_string, width: height_string}}>
        <Chessboard id="BasicBoard" position={fen} onPieceDrop={onDrop} />
      </div>
      <div id="scoreboard-container">
        <div id="scoreboard">
          <ScoreboardComponent turn={turn} />
        </div>
        <div id="chatbox"></div>
        <div id="scoreboard2">
          <ScoreboardComponent turn={turn} />
        </div>
      </div>
    </div>
    // <div id="ChessBoardPage" style={{padding: '1px'}}>
    //   {/* <div style={{ padding: '0px', paddingLeft: '0px', height: '0px' }}>
    //   <p style={{ color: 'white', padding: '0px', fontFamily: 'JetBrains Mono, monospace', fontSize: '65px', fontWeight:'bold', lineHeight: '0px'}}>chessence</p>
    //   </div> */}
    //   <div style={{ paddingLeft: '0px'}}>
    //     <div className="board-container" style={{ height: height_string, width: height_string}}>
    //       <Chessboard id="BasicBoard" position={fen} onPieceDrop={onDrop} />
    //     </div>
    //   </div>
    // </div>
  );
}



