export default function Question({ question, currentIndex, setCurrentIndex, selectedAnswers, setSelectedAnswers, length, setShowResult, setScore }) {
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
        <div className="flex flex-col justify-center text-center items-center">
            <p className="p-2 m-2">Question {currentIndex + 1}</p>
            <p>{question.question}</p>
            <div className="flex flex-col sm:flex-row justify-center text-center gap-5 p-2 m-2 self-center items-center">
                {question.answers.map((answer, index) => (
                    <div key={index}>
                        <button
                            className={`flex flex-row max-w-md items-center border rounded p-2 m-2 shadow-sm ${selectedAnswers[question.id] &&
                                selectedAnswers[question.id].answer === answer
                                ? 'bg-yellow-300'
                                : ''
                                }`}
                            onClick={() =>
                                handleClick(question.id, answer, answer === question.correctAnswer)
                            }
                        >
                            {answer}
                        </button>
                    </div>
                ))}
            </div>
            {currentIndex < length - 1 && (
                <button
                    className={`rounded cursor-pointer border self-center p-2 m-2 shadow-sm ${selectedAnswers[question.id] ? 'bg-green-600' : ''
                        }`}
                    disabled={!selectedAnswers[question.id]}
                    onClick={() => setCurrentIndex((prev) => prev + 1)}
                >
                    Next
                </button>
            )
            }
        </div >
    );
}
