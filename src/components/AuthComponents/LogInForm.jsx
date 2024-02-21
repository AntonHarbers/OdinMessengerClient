import { useState } from 'react';
import Button from '../Button';
import AuthErrors from './AuthErrors';

// eslint-disable-next-line react/prop-types
export default function LogInForm() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errors, setErrors] = useState([]);

  const FetchLogin = async (emailValue, passwordValue) => {
    const response = await fetch(`${import.meta.env.VITE_API_PATH}/log-in`, {
      method: 'POST',
      mode: 'cors',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        email: emailValue,
        password: passwordValue,
      }),
    });

    if (response.ok) {
      const data = await response.json();
      if (data) {
        if (data.errors) return setErrors(data.errors);

        localStorage.setItem(import.meta.env.VITE_JWT, data);
        window.location.reload();
      } else {
        setErrors(['Something went wrong']);
      }
    } else {
      return null;
    }
  };

  const HandleLogIn = (e) => {
    e.preventDefault();
    setErrors([]);

    // handle input checks on client side
    if (email.length < 1) return setErrors(['Username cannot be empty']);
    if (password.length < 6)
      return setErrors(['Password needs to be at least 6 characters long']);
    // send api request to log in route and see if response is a jwt
    FetchLogin(email, password);
  };

  const HandleGuestLogin = (e) => {
    e.preventDefault();
    FetchLogin('guest@test.com', 'default1234');
  };

  return (
    <form className="flex flex-col gap-5 w-[600px]">
      <h1 className="text-4xl text-center">Log-In</h1>
      <div className="flex w-full text-3xl justify-between gap-2">
        <label className="p-2">E-Mail</label>
        <input
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          type="text"
          className=" rounded-md p-2"
        />
      </div>
      <div className="flex w-full text-3xl justify-between gap-2">
        <label className="p-2">Password</label>
        <input
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="rounded-md p-2"
          type="password"
        />
      </div>
      <Button value={'Log-In'} onClickFunction={HandleLogIn} />
      {errors.map((err, index) => (
        <AuthErrors key={index} message={err} />
      ))}
      <Button
        value={'Try with guest profile'}
        onClickFunction={HandleGuestLogin}
      />
    </form>
  );
}
