import React, { useState } from "react";
import "./App.css";

const questions = [
  {
    question: "5+4=?",
    options: [
      "9",
      "5",
      "4",
      "54"
    ],
    correctAnswer: 0
  },
  {
    question: "8*5=?",
    options: ["8", "40", "04", "20"],
    correctAnswer: 1
  },
  {
    question: "6-9=?",
    options: ["-3", "3", "0", "-4"],
    correctAnswer: 0
  },
  {
    question: "100/20?",
    options: ["10", "5", "0", "50"],
    correctAnswer: 1
  },
  {
    question: "10+20+20=?",
    options: ["50", "60", "40", "52"],
    correctAnswer: 0
  }
];

function App() {
  const [current, setCurrent] = useState(0);
  const [selected, setSelected] = useState(null);
  const [score, setScore] = useState(0);
  const [showResult, setShowResult] = useState(false);

  const handleOptionChange = (index) => {
    setSelected(index);
  };

  const handleNext = () => {
    if (selected === questions[current].correctAnswer) {
      setScore(score + 1);
    }

    if (current + 1 < questions.length) {
      setCurrent(current + 1);
      setSelected(null);
    } else {
      setShowResult(true);
    }
  };

  const handleRestart = () => {
    setCurrent(0);
    setSelected(null);
    setScore(0);
    setShowResult(false);
  };

  return (
    <div className="quiz-container">
      <h1>Quiz App</h1>

      {!showResult ? (
        <div className="question-card">
          <h2>Question {current + 1} of {questions.length}</h2>
          <p className="question-text">{questions[current].question}</p>

          <div className="options">
            {questions[current].options.map((option, index) => (
              <label key={index} className={`option ${selected === index ? "selected" : ""}`}>
                <input
                  type="radio"
                  name="option"
                  value={index}
                  checked={selected === index}
                  onChange={() => handleOptionChange(index)}
                />
                {option}
              </label>
            ))}
          </div>

          <button
            className="next-btn"
            onClick={handleNext}
            disabled={selected === null}
          >
            {current + 1 === questions.length ? "Finish" : "Next"}
          </button>
        </div>
      ) : (
        <div className="result-card">
          <h2>Quiz Completed!</h2>
          <p>Your Score: {score} / {questions.length}</p>
          <button className="restart-btn" onClick={handleRestart}>Restart Quiz</button>
        </div>
      )}
    </div>
  );
}

export default App;
