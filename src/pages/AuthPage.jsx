import { useEffect, useRef, useState } from 'react';
import LogInForm from '../components/AuthComponents/LogInForm';
import { SignUpForm } from '../components/AuthComponents/SignUpForm';

// eslint-disable-next-line react/prop-types
export default function AuthPage({ setLoggedIn }) {
  const [isLogIn, setIsLogIn] = useState(true);
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
        data.message == 'You are signed in'
          ? setLoggedIn(true)
          : console.log(data.errors[0]);
      } else {
        return null;
      }
    };
    if (!fetchDone.current) {
      const JWT = localStorage.getItem(import.meta.env.VITE_JWT);
      // check if user has a jwt in local storage
      if (JWT) {
        FetchSession(JWT);
      }
      fetchDone.current = true;
    }
  }, [setLoggedIn]);

  return (
    <div className="bg-slate-500 h-[100vh] w-[100vw] flex items-center justify-center flex-col">
      {isLogIn ? (
        <LogInForm setLoggedIn={setLoggedIn} />
      ) : (
        <SignUpForm setIsLogIn={setIsLogIn} />
      )}
      <button
        onClick={() => setIsLogIn(!isLogIn)}
        className="text-md m-10 text-blue-300 underline hover:scale-110 active:scale-90 transition-all duration-75"
      >
        {isLogIn
          ? 'No Account yet? Sign-up here'
          : 'Already have an account? Log-In here'}
      </button>
    </div>
  );
}
