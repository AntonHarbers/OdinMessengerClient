import { useEffect, useRef, useState } from 'react';
import Sidebar from './components/Sidebar';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import HomePage from './pages/Homepage';
import AuthPage from './pages/AuthPage';
import ProfilePage from './pages/ProfilePage';

function App() {
  const [loggedIn, setLoggedIn] = useState(false);
  const [userId, setUserId] = useState('');
  const fetchDone = useRef(false);

  useEffect(() => {
    const FetchSession = async (JWT) => {
      const response = await fetch(`${import.meta.env.VITE_API_PATH}/session`, {
        headers: {
          Authorization: `Bearer ${JWT}`,
        },
      });
      if (response.ok) {
        const data = await response.json();
        if (data.message == 'You are signed in') {
          setLoggedIn(true);
          setUserId(data.userId);
        } else {
          console.log(data);
        }
      } else {
        return null;
      }
    };
    if (!fetchDone.current) {
      // check if user has a jwt in local storage
      const JWT = localStorage.getItem(import.meta.env.VITE_JWT);
      if (JWT) {
        FetchSession(JWT);
      }
      fetchDone.current = true;
    }
  }, []);

  return loggedIn ? (
    <Router>
      <div className="select-none flex bg-slate-600">
        <Sidebar setLoggedIn={setLoggedIn} setUserId={setUserId} />
        <Routes>
          <Route path="/" element={<HomePage userId={userId} />} />
          <Route
            path="/profile"
            element={
              <ProfilePage
                userId={userId}
                setLoggedIn={setLoggedIn}
                setUserId={setUserId}
              />
            }
          />
        </Routes>
      </div>
    </Router>
  ) : (
    <AuthPage />
  );
}

export default App;
