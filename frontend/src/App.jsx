import './App.css'
import {useEffect, useState } from 'react'

function App() {

  const [message, setMessage] = useState('')

  useEffect(() => {
    fetch('http://localhost:8000/')
      .then(res => res.json())
      .then(data => setMessage(data.message))
      .catch(() => setMessage('Could not connect to backend.'))
  }, [])
  return (
    <>
      <div>
        <h1>Focus Center</h1>
        <p>{message}</p>
      </div>  
    </>
  )
}

export default App
