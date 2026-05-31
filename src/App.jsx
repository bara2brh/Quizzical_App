import { useState, useEffect } from 'react'
import './App.css'
import Start from './components/Start'
import Quiz from './components/Quiz'

function App() {
  const [isGameStarted, setIsGameStarted] = useState(false)
  const [quizData, setQuizData] = useState([])
  const [selectedAnswers, setSelectedAnswers] =
    useState([{ answer: '', isCorrect: false }, { answer: '', isCorrect: false }, { answer: '', isCorrect: false }, { answer: '', isCorrect: false }, { answer: '', isCorrect: false }])
  const correctAnswers = quizData.map(q => q.correct_answer);

  
  useEffect(() => {
    fetch('https://opentdb.com/api.php?amount=5&type=multiple')
      .then(res => res.json())
      .then(data => {
        const results = data.results || [];
        setQuizData(results || [])
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
        incorrect_answers={quiz.incorrect_answers}
        handleChange={(e) => handleChange(e)}
      />
    ))
  }

  function handleChange(event) {
    const questionId = event.dataset.question_id
    const answersArr = selectedAnswers;
    answersArr[questionId] = {
      answer: event.value,
      isCorrect: isCorrectAnswer(questionId, event.value)
    };
    setSelectedAnswers(answersArr)
    console.log(selectedAnswers)
    console.log(correctAnswers)


  }

  function isCorrectAnswer(id, answer) {
    return correctAnswers[id] == answer
  }

  function checkAnswers() {




  }

  return (
    <>
      <main>
        {!isGameStarted && <Start handleClick={startGame} />}
        {isGameStarted && <div className="quiz-container">
          {initQuizList(quizData)}
          <button onClick={checkAnswers} className='btn btn-check'>Check answers</button>
        </div>}
      </main>
    </>
  )
}

export default App
