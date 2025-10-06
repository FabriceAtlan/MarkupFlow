import { useEffect } from 'react'

function App() {
  useEffect(() => {
    fetch(`${import.meta.env.VITE_API_URL}/api`)
    .then(res => res.json())
    .then(data => console.log(data));
  }, [])
  
  return (
    <>
      <h1>Vite + React</h1>
    </>
  )
}

export default App
