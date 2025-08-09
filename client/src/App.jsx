import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import './App.css';
import FormPage from './loginForm';
import VerificationPage from './verificationPage';
import { UserProvider } from './useContext';

function App() {
  return (
    <UserProvider>
      <Router>
        <Routes>
          <Route path="/" element={<FormPage />} />
          <Route path="/verification" element={<VerificationPage />} />
        </Routes>
      </Router>
    </UserProvider>
  );
}

export default App;
