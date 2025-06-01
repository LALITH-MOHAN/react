import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';
import Home from './pages/Home';
import User from './pages/User';

function App() {
  return (
    <BrowserRouter>
      <nav>
        <Link to="/">Home</Link>{" "}|{" "}
        <Link to="/user">Add User</Link>
      </nav>
      
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/user" element={<User />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
