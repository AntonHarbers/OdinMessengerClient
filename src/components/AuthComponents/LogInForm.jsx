import { useState } from 'react';
import AuthErrors from './AuthErrors';

// eslint-disable-next-line react/prop-types
export default function LogInForm({ setIsLogIn }) {
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
    <div className="flex min-h-full w-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-sm">
        <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
          Sign in to your account
        </h2>
      </div>

      <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
        <form className="space-y-6" action="#" method="POST">
          <div>
            <label
              htmlFor="email"
              className="block text-sm font-medium leading-6 text-white"
            >
              Email address
            </label>
            <div className="mt-2">
              <input
                id="email"
                name="email"
                type="email"
                autoComplete="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="block w-full rounded-md border-0 p-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
              />
            </div>
          </div>

          <div>
            <div className="flex items-center justify-between">
              <label
                htmlFor="password"
                className="block text-sm font-medium leading-6 text-white"
              >
                Password
              </label>
            </div>
            <div className="mt-2">
              <input
                id="password"
                name="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                autoComplete="current-password"
                required
                className="block w-full rounded-md border-0 p-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
              />
            </div>
          </div>

          <div>
            <button
              type="submit"
              onClick={HandleLogIn}
              className="flex w-full justify-center rounded-md bg-orange-400 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:text-orange-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
            >
              Sign in
            </button>
          </div>
          <div>
            <button
              onClick={HandleGuestLogin}
              className="flex w-full justify-center rounded-md bg-orange-400 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:text-orange-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
            >
              Try with a guest profile
            </button>
          </div>
          {errors.map((err, index) => (
            <AuthErrors key={index} message={err} />
          ))}
        </form>

        <p className="mt-10 text-center text-sm text-white">
          Not a member?{' '}
          <button
            onClick={() => setIsLogIn(false)}
            className="flex w-full justify-center rounded-md bg-orange-400 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:text-orange-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
          >
            Sign up here
          </button>{' '}
        </p>
      </div>
    </div>
  );
}
