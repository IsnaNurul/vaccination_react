import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';
import Login from './componen/Login';
import Dashboard from './componen/Dashboard';
import Consultation from './componen/Consultations';
import Vaccination from './componen/Vaccinations';
import SpotVaccination from './componen/SpotVaccination';

function App() {
  return (
    <Router>
      <Routes>
        <Route excapt path='/' element={<Login/>}/>
        <Route excapt path='/dashboard' element={<Dashboard/>}/>
        <Route excapt path='/consultation' element={<Consultation/>}/>
        <Route excapt path='/vaccination' element={<Vaccination/>}/>
        <Route excapt path='/spotvaccination' element={<SpotVaccination/>}/>
      </Routes>
    </Router>
  );
}

export default App;
