import { useState } from 'react';
import LogInForm from '../components/AuthComponents/LogInForm';
import { SignUpForm } from '../components/AuthComponents/SignUpForm';

// eslint-disable-next-line react/prop-types
export default function AuthPage() {
  const [isLogIn, setIsLogIn] = useState(true);

  return (
    <div className="bg-slate-500 h-[100vh] w-[100vw] flex items-center justify-center flex-col">
      {isLogIn ? (
        <LogInForm setIsLogIn={setIsLogIn} />
      ) : (
        <SignUpForm setIsLogIn={setIsLogIn} />
      )}
    </div>
  );
}
