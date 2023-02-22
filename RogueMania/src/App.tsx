import { useState } from 'react'
import { Game } from './game/Game'

function App() {
  const [gameLoop, setGameLoop] = useState(0)

  return (
    <div className="App">
      <Game />
    </div>
  )
}

export default App
