import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import './App.css';
import FormPage from './loginForm';
import VerificationPage from './verificationPage';
import { UserProvider } from './useContext';
import ErrorPage from './error';
import WrongEmail from './wrongEmail';
import WrongPhone from './wrongPhone';
import SuccessPage from './successPage';

function App() {
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

export default App;
