import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import ObjCounter from './components/ObjCounter'
import Area from './components/calarea'
import { Userdet } from './components/context'
import Child from './components/child'
function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <Userdet.Provider value="LALITH">
        <Child />
      </Userdet.Provider>
    </>
  )
}

export default App
