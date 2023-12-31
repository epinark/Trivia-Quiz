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
  setCurrentSelectedAnswer,
}) {
  const handleClick = (questionId, answer, isCorrect) => {
    setSelectedAnswers((prevSelectedAnswers) => ({
      ...prevSelectedAnswers,
      [questionId]: { answer, isCorrect },
    }));
    if (answer === question.correctAnswer) {
      setScore((prevScore) => prevScore + 1);
    }
    setCurrentSelectedAnswer(answer);
  };

  return (
    <div className="question-wrapper flex flex-col bg-custom-color rounded-lg gap-10 shadow-custom justify-center text-center py-8 px-8 items-center">
      <h1 className="font-normal">Trivia Questions</h1>{" "}
      <p className="">Question {currentIndex + 1}</p>
      <p>{decode(question.question)}</p>
      <div className="flex flex-col sm:flex-row justify-center text-center gap-5 p-2 self-center items-center">
        {question.answers.map((answer, index) => (
          <div key={index}>
            <button
              className={`flex flex-row max-w-md items-center border rounded p-2 shadow-md transition hover:-translate-y-1 hover:scale-110 hover:bg-purple ${
                selectedAnswers[question.id]?.answer === answer
                  ? "bg-purple"
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
          className={`rounded cursor-pointer border transition ease-in self-center bg-red-300 p-2 m-2 shadow-md ${
            selectedAnswers[question.id] ? "bg-purple" : ""
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
