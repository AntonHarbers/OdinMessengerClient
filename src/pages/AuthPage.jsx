import { useState } from 'react';
import LogInForm from '../components/AuthComponents/LogInForm';
import { SignUpForm } from '../components/AuthComponents/SignUpForm';

// eslint-disable-next-line react/prop-types
export default function AuthPage() {
  const [isLogIn, setIsLogIn] = useState(true);

  return (
    <div className="bg-slate-500 h-[100vh] w-[100vw] flex items-center justify-center flex-col">
      {isLogIn ? <LogInForm /> : <SignUpForm setIsLogIn={setIsLogIn} />}
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
