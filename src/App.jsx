import Menu from "./components/Menu";
import { useState, useEffect } from "react";
import { HelpContext } from "./components/Helper";
import Quiz from "./components/Quiz";
import EndGame from "./components/EndGame";

function App() {
  const [stage, setStage] = useState("menu");
  const [username, setUsername] = useState("");
  const [score, setScore] = useState(0);
  const [standing, setStanding] = useState(() => {
    const savedStandings = localStorage.getItem("leaderboard");
    return savedStandings ? JSON.parse(savedStandings) : [];
  });

  useEffect(() => {
    localStorage.setItem("leaderboard", JSON.stringify(standing));
  }, [standing]);

  const addToStanding = () => {
    const alreadyExists = standing.some((entry) => entry.username === username);

    // Only add if the user isn't already on the leaderboard
    if (!alreadyExists) {
      setStanding((prevStanding) => [
        ...prevStanding,
        { username, score }, // Add current username and score
      ]);
    }
  };

  const resetLeaderboard = () => {
    setStanding([]); 
    localStorage.removeItem("leaderboard"); // Remove from localStorage
  };

  return (
    <div className="App">
      <h1>Quiz App</h1>
      <HelpContext.Provider
        value={{
          stage,
          setStage,
          username,
          setUsername,
          score,
          setScore,
          standing,
          setStanding,
          addToStanding,
          resetLeaderboard
        }}
      >
        {stage === "menu" && <Menu />}
        {stage === "playing" && <Quiz />}
        {stage === "finished" && <EndGame />}
      </HelpContext.Provider>
    </div>
  );
}

export default App;
