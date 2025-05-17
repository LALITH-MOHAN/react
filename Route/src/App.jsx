import React from "react"
import {BrowserRouter,Route,Routes,Link} from 'react-router-dom'
import Home from "./Pages/home"
import About from "./Pages/about"
import Contact from "./Pages/contact"

function App() {
  return (
    <BrowserRouter>
    <nav style={{ marginBottom: '20px' }}>
      <Link to="/">Home</Link> |{" "}
      <Link to="/about">About</Link> |{" "}
      <Link to="/contact">Contact</Link>
    </nav>

    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/about" element={<About />} />
      <Route path="/contact" element={<Contact />} />
    </Routes>
  </BrowserRouter>
  )
}

export default App
