
import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';
//import main pages
import Home from './pages/Home';
import Employees from './pages/Employees';
import './AppRouter.css';

import { lazy, Suspense } from 'react';
//React.lazy for components
const EmployeeForm = lazy(() => import('./components/EmployeeForm'));
const EmployeeList = lazy(() => import('./components/EmployeeList')); 

function AppRouter() {
  return (
    <BrowserRouter>
      <nav className="navbar">
        <Link to="/">HOME</Link> | {" "}
        <Link to="/employees">EMPLOYEE</Link>
      </nav>

      <Routes>
        <Route path="/" element={<Home />} /> 
        <Route path="/employees" element={<Employees />}>
          <Route
            path="form"
            element={
              <Suspense fallback={<p>Loading Form...</p>}>
                <EmployeeForm />
              </Suspense>
            }/>
          <Route
            path="list"
            element={
              <Suspense fallback={<p>Loading List...</p>}>
                <EmployeeList />
              </Suspense>
            }/>
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default AppRouter;
