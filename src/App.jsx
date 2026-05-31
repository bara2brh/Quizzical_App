import { useState } from 'react'
import './App.css'
import Start from './components/Start'
import Quiz from './components/Quiz'

function App() {
  const [isGameStarted,setIsGameStarted] = useState(false)

  function startGame(){
    setIsGameStarted(!isGameStarted)
  }


  return (
    <>
      <main>
        {!isGameStarted && <Start handleClick={startGame} />}
        {isGameStarted && <Quiz/>}
      </main>
    </>
  )
}

export default App
