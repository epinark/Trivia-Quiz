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
  const [score, setScore] = useState(0);
  const [theme, setTheme] = useState('light');


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
  useEffect(() => {
    document.body.className = theme;
  }, [theme]);

  const restartGame = () => {
    setSelectedAnswers({});
    setShowResult(false);
    setCurrentIndex(0);
  };
  const toggleTheme = () => {
    if (theme === 'light') {
      setTheme('dark');
    } else {
      setTheme('light');
    }
  };


  return (
    <>
      <div className={`App ${theme === 'dark' ? 'dark' : 'light'}`} style={{ backgroundColor: theme === 'dark' ? '#181818' : '#f6f6f6', color: theme === 'dark' ? '#f6f6f6' : '#181818' }}>

        <button onClick={toggleTheme} className="flex items-center gap-2 p-2 m-2 my-auto ml-auto rounded border shadow-sm">
          <i className={`fas ${theme === 'light' ? 'fa-moon' : 'fa-sun'}`}></i>
          Toggle Theme
        </button>
        <div className='flex flex-col justify-center items-center text-center min-h-screen font-serif text-lg font-bold'>
          <h1 className='mb-8'>Trivia Questions</h1>
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
              <div className='flex flex-col items-center text-center h-screen font-sans text-lg font-bold p-2 m-2'>
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
                <button className="rounded border sm:mb-2 cursor-pointer self-center p-2 m-2 bg-green shadow-sm" onClick={restartGame}>Restart Quiz</button>
              </div>
            </Modal>
          ) : (
            currentIndex === questionsData.length - 1 && (
              <button className="rounded border cursor-pointer self-center p-2 m-4 shadow-sm" disabled={!selectedAnswers[questionsData[currentIndex].id]} onClick={handleCompleteButton}>Complete the Test</button>
            )
          )}
        </div>
      </div >
    </>
  );
}
