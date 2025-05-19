import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Employee from './pages/Employee';

function AppRouter() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/employees' element={<Employee />} />
      </Routes>
    </BrowserRouter>
  );
}

export default AppRouter;
