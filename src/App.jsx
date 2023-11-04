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
  const [currentSelectedAnswer, setCurrentSelectedAnswer] = useState(null);
  const [slideIn, setSlideIn] = useState(true);

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
    setCurrentSelectedAnswer(null);
  };

  const resetGame = () => {
    fetchQuestions();
    setCurrentIndex(0);
    setSelectedAnswers({});
    setCurrentSelectedAnswer(null);
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
          backgroundColor: theme === "dark" ? "#3A4750" : "#e5e7eb",
          // color: theme === "dark" ? "#e5e7eb" : "#3A4750",
          position: "sticky",
          height: "100vh",
        }}
      >
        <span class="right-shape"></span>
        <span class="rightside-shape"></span>
        <span class="left-shape"></span>
        <span class="leftside-shape"></span>
        <span class="leftthird-shape"></span>
        <span class="bottomleft-shape"></span>
        <span class="bottomleftthird-shape"></span>
        <span class="wave"></span>
        <span class="wave-right"></span>
        <span class="wave-left"></span>

        <span className="absolute font-poppins text-2xl top-8 right-20 z-2 ">
          <button
            onClick={toggleTheme}
            className="items-center gap-2 p-2 rounded border shadow-sm hidden sm:block"
          >
            <i
              className={`fas ${theme === "light" ? "fa-moon" : "fa-sun"}`}
              style={{ padding: "1rem" }}
            ></i>
            <span className="font-poppins font-extralight">Toggle Theme</span>
          </button>
        </span>
        <div className="question-container flex flex-col font-poppins text-2xl text-center py-3 px-6 absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 ">
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
              setCurrentSelectedAnswer={setCurrentSelectedAnswer}
              slideIn={true}
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
                  position: "absolute",
                  top: "50%",
                  left: "50%",
                  transform: "translate(-50%, -50%)",
                  height: "fit-content",
                  "@media (max-width: 640px)": {
                    top: "3%",
                    right: "4%",
                    left: "4%",
                  },
                },
              }}
            >
              <div className=" flex flex-col text-center font-poppins text-2xl p-2">
                <h1 className="mb-2">Quiz Finished!</h1>
                <h2>Final Score:</h2>
                <h2>
                  {score} / {questionsData.length}
                </h2>
                <h2 className="mb-2 gap-2">Review:</h2>
                <ul className="flex flex-col gap-6">
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
                              : "crimson",
                        }}
                      >
                        Your Answer:{" "}
                        {decode(selectedAnswers[question.id].answer)}
                      </div>
                    </li>
                  ))}
                </ul>
                <button
                  className="rounded border cursor-pointer p-2 bg-green shadow-sm mt-4 w-fit self-center bg-gradient-to-b  from-pink-200 via-blue-400 to-blue-500"
                  onClick={restartGame}
                >
                  Restart Quiz
                </button>
                <button
                  className="rounded border cursor-pointer p-2 shadow-sm mt-4 w-fit self-center bg-gradient-to-b from-pink-200 via-blue-400 to-blue-500"
                  onClick={resetGame}
                >
                  New Game
                </button>
              </div>
            </Modal>
          ) : (
            currentIndex === questionsData.length - 1 && (
              <button
                className="question-container rounded cursor-pointer p-2 shadow-custom bg-red mt-4 w-fit self-center"
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
