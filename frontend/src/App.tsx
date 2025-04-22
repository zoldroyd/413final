import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import WelcomePage from './pages/WelcomePage';
import EntertainersPage from './pages/EntertainersPage';
import DetailsPage from './pages/DetailsPage';

function App() {
  return (
    <>
      <Router>
        <Routes>
          <Route path="/" element={<WelcomePage />} />
          <Route path="/ents" element={<EntertainersPage />} />
          <Route path="/ents/:id" element={<DetailsPage />} />
        </Routes>
      </Router>
    </>
  );
}

export default App;
