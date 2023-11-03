import React from "react";
import Game from "./ChessBoard.js";
import Board from "./ChessBoard.js";
import { useLocation } from 'react-router-dom';




export default function GameResultPage(props) {
    // const { winner } = useParams();
    const { state } = useLocation();
    const { winner } = state;

  return (
    <div>
        <p>Winner: { winner }</p>
        <p>Results!!</p>
    </div>
  );
}

// just added this page to be redirected to when reaching a stalemate or end Game. maybe dont
// redirect and instead just have a popup? 

