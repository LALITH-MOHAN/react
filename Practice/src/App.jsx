import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import ObjCounter from './components/ObjCounter'
import Area from './components/calarea'
function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <div>
        <Area />
      </div>
    </>
  )
}

export default App
