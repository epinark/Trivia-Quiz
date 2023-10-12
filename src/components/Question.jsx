import { decode } from "he";

export default function Question({
  question,
  currentIndex,
  setCurrentIndex,
  selectedAnswers,
  setSelectedAnswers,
  length,
  setShowResult,
  setScore,
}) {
  const handleClick = (questionId, answer, isCorrect) => {
    setSelectedAnswers((prevSelectedAnswers) => ({
      ...prevSelectedAnswers,
      [questionId]: { answer, isCorrect },
    }));
    if (answer === question.correctAnswer) {
      setScore((prevScore) => prevScore + 1);
    }
  };

  return (
    <div className="flex flex-col bg-custom-color rounded-lg shadow-2xl justify-center text-center items-center p-2">
      <h1 className="mb-4">Trivia Questions</h1>{" "}
      <p className="p-2 m-2 mb-6">Question {currentIndex + 1}</p>
      <p>{decode(question.question)}</p>
      <div className="flex flex-col sm:flex-row justify-center text-center gap-5 p-2 m-4 self-center items-center">
        {question.answers.map((answer, index) => (
          <div key={index}>
            <button
              className={`flex flex-row max-w-md items-center border rounded p-2 m-2 shadow-md ${
                selectedAnswers[question.id] &&
                selectedAnswers[question.id].answer === answer
                  ? "bg-slate-300"
                  : ""
              }`}
              onClick={() =>
                handleClick(
                  question.id,
                  answer,
                  answer === question.correctAnswer
                )
              }
            >
              {decode(answer)}
            </button>
          </div>
        ))}
      </div>
      {currentIndex < length - 1 && (
        <button
          className={`rounded cursor-pointer border self-center p-2 m-2 shadow-md ${
            selectedAnswers[question.id] ? "bg-mint" : ""
          }`}
          disabled={!selectedAnswers[question.id]}
          onClick={() => setCurrentIndex((prev) => prev + 1)}
        >
          Next
        </button>
      )}
    </div>
  );
}
