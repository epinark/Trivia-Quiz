import { useState, useEffect } from "react";
import "./App.css";
import Question from "./components/Question";
import axios from "axios";
import Modal from "react-modal";
import StartAnimation from "./components/StartAnimation";
import "./StartAnimation.css";
import popcorn from "./assets/popcorn.svg";
import { decode } from "he";

Modal.setAppElement("#root");
export default function App() {
  const [questionsData, setQuestionsData] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [loading, setLoading] = useState(true);
  const [selectedAnswers, setSelectedAnswers] = useState({});
  const [showResult, setShowResult] = useState(false);
  const [score, setScore] = useState(0);
  const [theme, setTheme] = useState("light");
  const [modalIsOpen, setIsOpen] = useState(false);

  const fetchQuestions = async () => {
    try {
      const response = await axios.get(
        "https://wd40-trivia.onrender.com/api/questions"
      );
      setQuestionsData(response.data);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching questions:", error);
      setLoading(false);
    }
  };

  useEffect(() => {
    // Call the fetchQuestions function when the component mounts
    fetchQuestions();
  }, []);

  const handleCompleteButton = () => {
    setShowResult(true);
    openModal();
  };

  useEffect(() => {
    document.body.className = theme;
  }, [theme]);

  const restartGame = () => {
    setSelectedAnswers({});
    setShowResult(false);
    setScore(0);
    setCurrentIndex(0);
    setIsOpen(false);
  };

  const resetGame = () => {
    fetchQuestions();
    setCurrentIndex(0);
    setSelectedAnswers({});
    setShowResult(false);
    setScore(0);
    setLoading(true);
    setIsOpen(false);
  };

  const toggleTheme = () => {
    if (theme === "light") {
      setTheme("dark");
    } else {
      setTheme("light");
    }
  };
  const openModal = () => {
    setIsOpen(true);
  };

  const closeModal = () => {
    setIsOpen(false);
  };

  return (
    <div>
      <div
        style={{
          backgroundColor: theme === "dark" ? "#3A4750" : "#f6f6f6",
          color: theme === "dark" ? "#f6f6f6" : "#3A4750",
          padding: "1rem",
          position: "sticky",
        }}
      >
        <span class="right-shape"></span>
        <span class="left-shape"></span>
        <button
          onClick={toggleTheme}
          className="flex items-center gap-2 p-2 my-auto ml-auto rounded border shadow-sm"
        >
          <i className={`fas ${theme === "light" ? "fa-moon" : "fa-sun"}`}></i>
          Toggle Theme
        </button>
        <div className="flex flex-col justify-center items-center text-center min-h-screen font-serif text-lg font-bold">
          {/* <div className="box">
            <div className="frame">
              <img src={popcorn} alt="" />
            </div>
          </div> */}
          {loading ? (
            <StartAnimation />
          ) : (
            <Question
              question={questionsData[currentIndex]}
              currentIndex={currentIndex}
              setCurrentIndex={setCurrentIndex}
              selectedAnswers={selectedAnswers}
              setSelectedAnswers={setSelectedAnswers}
              length={questionsData.length}
              setShowResult={setShowResult}
              setScore={setScore}
            />
          )}
          {showResult ? (
            <Modal
              isOpen={modalIsOpen}
              onRequestClose={closeModal}
              style={{
                overlay: {
                  background: "rgba(0, 0, 0, 0.6)",
                },
                content: {
                  background: theme === "dark" ? "#3A4750" : "#f6f6f6",
                  color: theme === "dark" ? "#f6f6f6" : "#3A4750",
                  border: "none",
                  borderRadius: "8px",
                },
              }}
            >
              <div className="flex flex-col items-center text-center font-sans text-lg font-bold p-2">
                <h1 className="mb-2">Quiz Finished!</h1>
                <h2>Final Score:</h2>
                <h2>
                  {score} / {questionsData.length}
                </h2>
                <h2 className="mb-2">Review:</h2>
                <ul>
                  {questionsData.map((question) => (
                    <li key={question.id}>
                      {decode(question.question)}
                      <div className="text-green-700">
                        Correct Answer: {decode(question.correctAnswer)}
                      </div>
                      <div
                        style={{
                          color:
                            selectedAnswers[question.id].answer ===
                            question.correctAnswer
                              ? "green"
                              : "red",
                        }}
                      >
                        Your Answer:{" "}
                        {decode(selectedAnswers[question.id].answer)}
                      </div>
                    </li>
                  ))}
                </ul>
                <button
                  className="rounded border cursor-pointer p-2 bg-green shadow-sm mt-4"
                  onClick={restartGame}
                >
                  Restart Quiz
                </button>
                <button
                  className="rounded border cursor-pointer p-2 bg-green shadow-sm mt-4"
                  onClick={resetGame}
                >
                  New Game
                </button>
              </div>
            </Modal>
          ) : (
            currentIndex === questionsData.length - 1 && (
              <button
                className="rounded cursor-pointer p-2 shadow-custom bg-red mt-4"
                disabled={!selectedAnswers[questionsData[currentIndex].id]}
                onClick={handleCompleteButton}
              >
                Complete the Test
              </button>
            )
          )}
        </div>
      </div>
    </div>
  );
}
