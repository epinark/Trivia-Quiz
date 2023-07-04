import { useState, useEffect } from 'react'
import './App.css'
import Question from './components/Question';
import axios from 'axios';
import Modal from 'react-modal';

export default function App() {
  const [questionsData, setQuestionsData] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [loading, setLoading] = useState(true);
  const [selectedAnswers, setSelectedAnswers] = useState({});
  const [showResult, setShowResult] = useState(false);
  const [score, setScore] = useState(0)


  useEffect(() => {
    const fetchQuestions = async () => {
      try {
        const response = await axios.get('https://wd40-trivia.onrender.com/api/questions');
        setQuestionsData(response.data);
        setLoading(false);
        console.log(response.data);
      } catch (error) {
        console.error('Error fetching questions:', error);
        setLoading(false);
      }
    };

    fetchQuestions();
  }, []);
  const handleCompleteButton = () => {
    setShowResult(true);
  };

  const restartGame = () => {
    setSelectedAnswers({});
    setShowResult(false);
    setCurrentIndex(0);
  };


  return (
    <>
      <div className='flex flex-col justify-center items-center text-center h-screen font-serif text-lg font-bold'>
        <h1>Trivia Questions</h1>
        {loading ? (
          <p>Loading...</p>
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
          <Modal isOpen={true} onRequestClose={restartGame}>
            <div className='flex flex-col justify-center items-center text-center h-screen font-serif text-lg font-bold p-2 m-2'>
              <h1 className='p-2 m-2'>Quiz Finished!</h1>
              <h2 className='p-2 m-2'>Final Score: </h2>
              <h2>
                {score} / {questionsData.length}
              </h2>
              <h2 className='p-2 m-2'>Review: </h2>
              <ul>

                {questionsData.map((question) => (
                  <li className='p-2 m-2' key={question.id}>
                    {question.question}
                    <div className='text-green-700'>
                      Correct Answer: {question.correctAnswer}
                    </div>
                    <div style={{
                      color:
                        selectedAnswers[question.id].answer === question.correctAnswer
                          ? 'green'
                          : 'red',
                    }}>Your Answer: {selectedAnswers[question.id].answer}
                    </div>
                  </li>
                ))}
              </ul>

              <button className="rounded border cursor-pointer self-center p-2 m-4 bg-green" onClick={restartGame}>Restart game</button>
            </div>
          </Modal>
        ) : (
          currentIndex === questionsData.length - 1 && (
            <button className="rounded border cursor-pointer self-center p-2 m-4" disabled={!selectedAnswers[questionsData[currentIndex].id]} onClick={handleCompleteButton}>Complete the Test</button>
          )
        )}
      </div>
    </>
  );
}