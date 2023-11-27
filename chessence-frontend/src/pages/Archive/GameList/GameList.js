import GameEntry from "../Games/GameEntry";
import "./gameList.css";

export default function GameList(props) {
  const games = [
    { score: "0 - 1", player1: "John", player2: "Charlie", date: "10/9/23" },
    { score: "1 - 0", player1: "John", player2: "Will", date: "11/9/23" }
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