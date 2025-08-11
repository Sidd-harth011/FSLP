// client/src/App.jsx
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { UserProvider } from './useContext';
import FormPage from './loginForm';
import VerificationPage from './verificationPage';
import WrongEmail from './wrongEmail';
import WrongPhone from './wrongPhone';
import ErrorPage from './error';
import SuccessPage from './successPage';
import './App.css';
export default function App() {
  return (
    <UserProvider>
      <Router>
        <Routes>
          <Route path="/" element={<FormPage />} />
          <Route path="/verification" element={<VerificationPage />} />
          <Route path="/wrongemail" element={<WrongEmail />} />
          <Route path="/wrongphone" element={<WrongPhone />} />
          <Route path="/error" element={<ErrorPage />} />
          <Route path="/success" element={<SuccessPage />} />
        </Routes>
      </Router>
    </UserProvider>
  );
}
