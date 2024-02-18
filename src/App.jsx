import { useState } from 'react';
import Sidebar from './components/Sidebar';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import HomePage from './pages/Homepage';
import AuthPage from './pages/AuthPage';
import ProfilePage from './pages/ProfilePage';

function App() {
  const [loggedIn, setLoggedIn] = useState(false);

  return loggedIn ? (
    <Router>
      <div className="select-none flex bg-slate-600">
        <Sidebar setLoggedIn={setLoggedIn} />
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/profile" element={<ProfilePage />} />
        </Routes>
      </div>
    </Router>
  ) : (
    <AuthPage setLoggedIn={setLoggedIn} />
  );
}

export default App;
