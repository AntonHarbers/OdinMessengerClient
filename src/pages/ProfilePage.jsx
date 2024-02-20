import { useEffect, useRef, useState } from 'react';
import Button from '../components/Button';
import InputRow from '../components/ProfilePageComponents/InputRow';
import AuthErrors from '../components/AuthComponents/AuthErrors';

// eslint-disable-next-line react/prop-types
export default function ProfilePage({ userId, setLoggedIn, setUserId }) {
  const [editing, setEditing] = useState(false);
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [profilePicUrl, setProfilePicUrl] = useState('');
  const [errors, setErrors] = useState([]);
  const loading = useRef(true);

  useEffect(() => {
    if (!loading.current) return;
    const FetchUserData = async () => {
      const response = await fetch(
        `${import.meta.env.VITE_API_PATH}/users/${userId}`,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem(
              import.meta.env.VITE_JWT
            )}`,
          },
        }
      );

      if (response.ok) {
        const data = await response.json();
        setEmail(data.email);
        setUsername(data.username);
        setProfilePicUrl(data.profile_pic_url);
      } else {
        setErrors(['Something went wrong']);
      }
    };
    FetchUserData();
    loading.current = false;
  }, [userId]);

  const HandleEditBtnClick = async (e) => {
    e.preventDefault();
    setErrors([]);
    if (username == '') return setErrors(['Username should not be empty']);
    if (email == '') return setErrors(['Email should not be empty']);

    if (editing) {
      // send a patch request to update user data

      const body = {
        username: username,
        email: email,
      };

      if (profilePicUrl != '') body.profile_pic_url = profilePicUrl;

      const response = await fetch(
        `${import.meta.env.VITE_API_PATH}/users/${userId}`,
        {
          method: 'PUT',
          mode: 'cors',
          headers: {
            Authorization: `Bearer ${localStorage.getItem(
              import.meta.env.VITE_JWT
            )}`,
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(body),
        }
      );

      if (response.ok) {
        const data = await response.json();
        if (data.errors) {
          setErrors(data.errors);
        } else {
          setEditing(false);
        }
      } else {
        setErrors(['Something went wrong']);
      }
    } else {
      setEditing(true);
    }
  };

  const HandleDeleteProfile = async () => {
    console.log('deleted');
    const response = await fetch(
      `${import.meta.env.VITE_API_PATH}/users/${userId}`,
      {
        method: 'DELETE',
        mode: 'cors',
        headers: {
          Authorization: `Bearer ${localStorage.getItem(
            import.meta.env.VITE_JWT
          )}`,
        },
      }
    );

    if (response.ok) {
      const data = await response.json();
      console.log(data);
      localStorage.setItem(import.meta.env.VITE_JWT, '');
      setLoggedIn(false);
      setUserId('');
    } else {
      setErrors([
        'Something went wrong with deleting your account, try again later',
      ]);
    }
  };
  return !loading.current ? (
    <div className="w-[calc(100%-150px)] flex flex-col justify-start pt-28 items-center">
      <form className="text-slate-100 w-[700px] text-xl flex flex-col gap-2 border-slate-200 border rounded-md p-5">
        <h1 className="text-4xl text-center m-6 flex items-center justify-between gap-10">
          User Information
          {profilePicUrl != '' && (
            <div className="h-20 w-20 overflow-hidden flex items-center justify-center rounded-full">
              {' '}
              <img src={profilePicUrl} />
            </div>
          )}
        </h1>

        <InputRow
          editing={editing}
          infoValue={username}
          labelValue={'Username'}
          setValueFunction={setUsername}
        />
        <InputRow
          editing={editing}
          infoValue={email}
          labelValue={'E-mail'}
          setValueFunction={setEmail}
        />
        <InputRow
          editing={editing}
          infoValue={profilePicUrl}
          labelValue={'Profile Picture URL'}
          setValueFunction={setProfilePicUrl}
        />
        <Button
          value={editing ? 'Save' : 'Edit'}
          onClickFunction={HandleEditBtnClick}
          customStyles={` ${
            editing
              ? 'bg-green-600 hover:bg-green-700 active:bg-green-500'
              : ' bg-slate-400 hover:bg-slate-500 active:bg-slate-300'
          } transition-all duration-75 `}
        />
        {errors.map((err) => (
          <AuthErrors message={err} key={err} />
        ))}
      </form>
      <Button
        customStyles={'bg-red-700 text-white m-5 w-[300px]'}
        onClickFunction={HandleDeleteProfile}
        value={'Confirm deletion of your profile'}
      />
    </div>
  ) : (
    <div>Loading...</div>
  );
}
