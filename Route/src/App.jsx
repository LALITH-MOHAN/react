import React, { Suspense, lazy } from "react";
import { BrowserRouter, Route, Routes, Link } from "react-router-dom";
import Home from "./Pages/home";
import Contact from "./Pages/contact";
import Userprofile from "./Pages/Userprofle";


const About = lazy(() => import("./Pages/about"));

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
        <Route
          path="/about"
          element={
            <Suspense fallback={<h1>LOADING ABOUT.....</h1>}>
              <About />
            </Suspense>
          }
        />
        <Route path="/contact" element={<Contact />} />
        <Route path="/user/:id" element={<Userprofile />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
