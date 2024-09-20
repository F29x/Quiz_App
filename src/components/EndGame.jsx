import { useContext, useEffect } from "react";
import { HelpContext } from "./Helper";

import "../styles/EndGame.css"

function EndGame() {
  const { score, setStage, username, standing, addToStanding, resetLeaderboard } =
    useContext(HelpContext);

  // Add the current user's score to the leaderboard only once
  useEffect(() => {
    addToStanding();
  }, []); 

  // Sort the leaderboard in descending order of score and slice top 10
  const sortedLeaderboard = standing
    .sort((a, b) => b.score - a.score)
    .slice(0, 10);

  return (
    <div>
      <h2>Quiz Finished !!!</h2>
      
      
      <div className="final-score">
        <strong>{username}</strong> <br />
        Score: {score} points
      </div>

      <button onClick={() => setStage("menu")}>Restart Quiz</button>

    
      <div className="leaderboard">
        <h3>Leaderboard</h3>
        <ol>
          {sortedLeaderboard.map((entry, index) => (
            <li key={index}>
              {entry.username}: {entry.score} points
            </li>
          ))}
        </ol>
        <button onClick={resetLeaderboard}>Reset LeaderBoard</button>
      </div>
    </div>
  );
}

export default EndGame;
