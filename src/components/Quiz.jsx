import { useState, useContext, useEffect } from "react";
import { HelpContext } from "./Helper";
import { Question } from "./Questions";
import "../styles/Quiz.css";

// Function to shuffle an array
const shuffleArray = (array) => {
  return array.sort(() => Math.random() - 0.5);
};

function Quiz() {
  const { setScore, setStage } = useContext(HelpContext);
  const [quizstate, setQuizstate] = useState(0);
  const [result, setResult] = useState(""); // To store selected answer
  const [shuffledQuestions, setShuffledQuestions] = useState([]);

  // Shuffle questions when component mounts
  useEffect(() => {
    setShuffledQuestions(shuffleArray([...Question])); // Shuffle and set questions
  }, []);

  const playerChoice = (option) => {
    setResult(option); // Update selected answer
  };

  const nextQuestion = () => {
    // If the selected answer is correct, increment the score
    if (shuffledQuestions[quizstate].answer === result) {
      setScore((prevScore) => prevScore + 1);
    }

    // If the current question is the last one, end the quiz
    if (quizstate === shuffledQuestions.length - 1) {
      finishGame();
    } else {
      // Move to the next question
      setQuizstate(quizstate + 1);
    }

    // Reset the selected answer for the next question
    setResult("");
  };

  const finishGame = () => {
    setStage("finished");
  };

  return (
    <div>
      <h2>Quiz Start:</h2>
      {shuffledQuestions.length > 0 && (
        <>
          <h3>{shuffledQuestions[quizstate].prompt}</h3>
          <div className="center">
            <button
              className={result === "A" ? "selected" : ""}
              onClick={() => playerChoice("A")}
            >
              {shuffledQuestions[quizstate].A}
            </button>
            <button
              className={result === "B" ? "selected" : ""}
              onClick={() => playerChoice("B")}
            >
              {shuffledQuestions[quizstate].B}
            </button>
            <button
              className={result === "C" ? "selected" : ""}
              onClick={() => playerChoice("C")}
            >
              {shuffledQuestions[quizstate].C}
            </button>
            <button
              className={result === "D" ? "selected" : ""}
              onClick={() => playerChoice("D")}
            >
              {shuffledQuestions[quizstate].D}
            </button>
          </div>
          <button onClick={nextQuestion}>
            {quizstate === shuffledQuestions.length - 1
              ? "End Quiz"
              : "Next Question"}
          </button>
        </>
      )}
    </div>
  );
}

export default Quiz;
