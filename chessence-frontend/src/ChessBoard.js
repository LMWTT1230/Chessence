import { useState, useRef, useEffect } from "react";
import { Chess } from "chess.js";
import './index.css'; // Import your custom CSS file



import { Chessboard } from "react-chessboard";

// function ScreenSize() {
//   return (
//     <div>
//       <p> Width: <strong>{windowDimension.winWidth}</strong></p>
//       <p> Height: <strong>{windowDimension.winHeight}</strong></p>
//     </div>
//   )
// }

export default function App() {
  const chess = new Chess();
  const game_fen = chess.fen();
  const [fen, setFen] = useState(game_fen);

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

  console.log("in def");
  function onDrop(sourceSquare, targetSquare) {
    console.log("in on drop");
    const move = {
      from: sourceSquare,
      to: targetSquare,
      promotion: "q", // always promote to a queen for example simplicity
    };

    try {
      const newChess = new Chess(fen)
      newChess.move(move)
      const newFen = newChess.fen();
      setFen(newFen); // Update the state with the new FEN
    } catch (error) {
      console.log("Illegal move.") 
    }
  }
  const width_string = windowDimension.winWidth + 'px'; // Convert to a string with 'px' appended
  const height_string = windowDimension.winHeight-60 + 'px'; // Convert to a string with 'px' appended


  // ...
  
  return (
    <div>
      <div style={{ padding: '0px', paddingLeft: '35px', height: '60px'}}>
      <p style={{ padding: '0px', fontFamily: 'JetBrains Mono, monospace', fontSize: '65px', fontWeight:'bold', lineHeight: '80px'}}>chessence</p>
      </div>
      <div style={{ paddingLeft: '20px'}}>
        <div style={{ height: height_string, width: height_string, padding: '20px'}}>
          <Chessboard id="BasicBoard" position={fen} onPieceDrop={onDrop} />
        </div>
      </div>
    </div>
  );
}


