import { useState } from 'react';
import Button from '../Button';
import AuthErrors from './AuthErrors';

// eslint-disable-next-line react/prop-types
export function SignUpForm({ setIsLogIn }) {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [profilePicUrl, setProfilePicUrl] = useState('');
  const [errors, setErrors] = useState([]);

  const FetchSignup = async () => {
    const body = {
      email: email,
      username: username,
      password: password,
    };

    if (profilePicUrl != '') body.profile_pic_url = profilePicUrl;
    const response = await fetch(`${import.meta.env.VITE_API_PATH}/users`, {
      method: 'POST',
      mode: 'cors',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(body),
    });

    if (response.ok) {
      const data = await response.json();
      if (data.errors) return setErrors(data.errors);
      // redirect to login page
      setIsLogIn(true);
    } else {
      setErrors(['Something went wrong']);
    }
  };

  const HandleSignUp = (e) => {
    e.preventDefault();

    // local error handling
    if (username.length < 1) return setErrors(['Username cannot be empty']);
    if (password != confirmPassword)
      return setErrors(['Password and confirm password must match']);
    if (password.length < 6)
      return setErrors(['Password needs to be at least 6 characters long']);
    if (email.length < 1) return setErrors(['Email must not be empty']);

    FetchSignup();
  };
  return (
    <form className="flex flex-col gap-5 w-[600px]">
      <h1 className="text-4xl text-center">Sign Up</h1>
      <div className="flex w-full text-3xl justify-between gap-2">
        <label className="p-2">Username</label>
        <input
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          type="text"
          className=" rounded-md p-2"
        />
      </div>
      <div className="flex w-full text-3xl justify-between gap-2">
        <label className="p-2">E-mail</label>
        <input
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="rounded-md p-2"
          type="text"
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
      <div className="flex w-full text-3xl justify-between gap-2">
        <label className="p-2">Confirm Password</label>
        <input
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          className="rounded-md p-2"
          type="password"
        />
      </div>
      <div className="flex w-full text-3xl justify-between gap-2">
        <label className="p-2">Profile Picture Url (optional)</label>
        <input
          value={profilePicUrl}
          onChange={(e) => setProfilePicUrl(e.target.value)}
          className="rounded-md p-2"
          type="text"
        />
      </div>
      <Button value={'Sign-Up'} onClickFunction={HandleSignUp} />
      {errors.map((err) => (
        <AuthErrors key={err} message={err} />
      ))}
    </form>
  );
}
