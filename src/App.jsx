import { useState, useEffect } from 'react'
import './App.css'
import Start from './components/Start'
import Quiz from './components/Quiz'
import clsx from 'clsx';


function App() {
  const [isGameStarted, setIsGameStarted] = useState(false)
  const [isGameOver, setIsGameOver] = useState(false)
  const [quizData, setQuizData] = useState([])
  const [selectedAnswers, setSelectedAnswers] =
    useState([{ answer: '', isCorrect: false }, { answer: '', isCorrect: false },
       { answer: '', isCorrect: false }, { answer: '', isCorrect: false },
        { answer: '', isCorrect: false }])
  const correctAnswers = quizData.map(q => q.correct_answer);


 function fetchQuestions() {
  fetch('https://opentdb.com/api.php?amount=5&type=multiple')
    .then(res => res.json())
    .then(data => {
      setQuizData(data.results || []);
    });
}

useEffect(() => {
  fetchQuestions();
}, []);

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
        isGameOver={isGameOver}
        selectedAnswer={selectedAnswers[index]?.answer}

      />
    ))
  }

  function handleChange(event) {
  const questionId = event.dataset.question_id;

  setSelectedAnswers(prev => {
    const updated = [...prev];

    updated[questionId] = {
      answer: event.value,
      isCorrect: isCorrectAnswer(questionId, event.value)
    };

    return updated;
  });
}

  function isCorrectAnswer(id, answer) {
    return correctAnswers[id] == answer
  }

  function checkAnswers() {
      setIsGameOver(!isGameOver)
  }

  function playAgain() {
  setIsGameOver(false);

  setSelectedAnswers([
    { answer: '', isCorrect: false },
    { answer: '', isCorrect: false },
    { answer: '', isCorrect: false },
    { answer: '', isCorrect: false },
    { answer: '', isCorrect: false }
  ]);

  fetchQuestions();
}

  return (
    <>
      <main>
        {!isGameStarted && <Start handleClick={startGame} />}
        {isGameStarted && <div className="quiz-container">
          {initQuizList(quizData)}
          <button onClick={isGameOver? playAgain :checkAnswers} className='btn btn-check'>{isGameOver?'Play again': 'Check answers'}</button>
          {isGameOver && <h2 className='score'>You scored {selectedAnswers.filter((answer)=>answer.isCorrect).length}/5 correct answers</h2>}
        </div>}
      </main>
    </>
  )
}

export default App
