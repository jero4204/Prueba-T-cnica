import { useState } from 'react'
import { ShowQuote } from './components/ShowQuote'
import './App.css'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <ShowQuote/>
    </>
  )
}

export default App
