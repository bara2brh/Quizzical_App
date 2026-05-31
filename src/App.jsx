import { useState, useEffect } from 'react'
import './App.css'
import Start from './components/Start'
import Quiz from './components/Quiz'

function App() {
  const [isGameStarted, setIsGameStarted] = useState(false)
  const [quizData, setQuizData] = useState([])
  useEffect(() => {
    fetch('https://opentdb.com/api.php?amount=5&type=multiple')
      .then(res => res.json())
      .then(data => {
        setQuizData(data.results || [])
      })
  }, [])

  function startGame() {
    setIsGameStarted(!isGameStarted)
  }

  function initQuizList(quizData) {
    return quizData.map((quiz, index) => (
      <Quiz
        id={index}
        key={index}
        question={quiz.question}
        correct_answer={quiz.correct_answer}
        incorrect_answers={quiz.incorrect_answers} />
    ))
  }

  return (
    <>
      <main>
        {!isGameStarted && <Start handleClick={startGame} />}
        {isGameStarted && <div className="quiz-container">
          {initQuizList(quizData)}
          <button className='btn btn-check'>Check answers</button>
        </div>}
      </main>
    </>
  )
}

export default App
