import { BrowserRouter, Routes, Route,Link} from 'react-router-dom';
import Home from './pages/Home';
import Employee from './pages/Employee';
import './AppRouter.css'
function AppRouter() {
  return (
    <BrowserRouter>
    <nav className="navbar">
        <Link to='/'>HOME</Link> | {" "}
        <Link to='/employees'>EMPLOYEE</Link>
      </nav>
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/employees' element={<Employee />} />
      </Routes>
    </BrowserRouter>
  );
}

export default AppRouter;
