import React from "react";


function ScoreboardComponent(props) {
  let turnCheck = false;
  if(props.this === props.turn){
    turnCheck = true;
  }
    return (
        <div>
            <ScoreboardHighlight highlight={ turnCheck } />
        </div>
    );
}

function ScoreboardHighlight(props){
  if(props.highlight){
    return (
      <div id="highlightbox">
        <p>Your turn.</p>
      </div>
    )
  }
  return (
    <div id="unselectedbox">
        <p>Waiting for opponent..</p>
    </div>
  )
}

export default ScoreboardComponent;