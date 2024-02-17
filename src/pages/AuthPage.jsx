import { useState } from 'react';
import Button from '../components/Button';

// eslint-disable-next-line react/prop-types
export default function AuthPage({ setLoggedIn }) {
  const [isLogIn, setIsLogIn] = useState(true);
  const HandleLogIn = (e) => {
    e.preventDefault();
    setLoggedIn(true);
  };
  const HandleSignUp = (e) => {
    e.preventDefault();
    setLoggedIn(true);
  };

  return (
    <div className="bg-slate-500 h-[100vh] w-[100vw] flex items-center justify-center flex-col">
      {isLogIn ? (
        <LogInForm HandleLogIn={HandleLogIn} />
      ) : (
        <SignUpForm HandleSignUp={HandleSignUp} />
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

// eslint-disable-next-line react/prop-types
export function SignUpForm({ HandleSignUp }) {
  return (
    <form className="flex flex-col gap-5 w-[600px]">
      <h1 className="text-4xl text-center">Sign Up</h1>
      <div className="flex w-full text-3xl justify-between gap-2">
        <label className="p-2">Username</label>
        <input type="text" className=" rounded-md p-2" />
      </div>
      <div className="flex w-full text-3xl justify-between gap-2">
        <label className="p-2">Password</label>
        <input className="rounded-md p-2" type="password" />
      </div>
      <Button value={'Log-In'} onClickFunction={HandleSignUp} />
    </form>
  );
}

// eslint-disable-next-line react/prop-types
export function LogInForm({ HandleLogIn }) {
  return (
    <form className="flex flex-col gap-5 w-[600px]">
      <h1 className="text-4xl text-center">Log-In</h1>
      <div className="flex w-full text-3xl justify-between gap-2">
        <label className="p-2">Username</label>
        <input type="text" className=" rounded-md p-2" />
      </div>
      <div className="flex w-full text-3xl justify-between gap-2">
        <label className="p-2">Password</label>
        <input className="rounded-md p-2" type="password" />
      </div>
      <Button value={'Log-In'} onClickFunction={HandleLogIn} />
    </form>
  );
}
