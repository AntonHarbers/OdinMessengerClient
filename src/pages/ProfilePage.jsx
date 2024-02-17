import { useState } from 'react';
import Button from '../components/Button';
import InputRow from '../components/ProfilePageComponents/InputRow';

export default function ProfilePage() {
  const [editing, setEditing] = useState(false);
  const [username, setUsername] = useState('Username');
  const [email, setEmail] = useState('username@email.com');
  const [profilePicUrl, setProfilePicUrl] = useState(
    'https://locahost:3000/3000/1000Abkjsf.sdk'
  );

  const HandleEditBtnClick = (e) => {
    e.preventDefault();
    setEditing(!editing);
  };
  return (
    <div className="w-[calc(100%-150px)] flex flex-col justify-start pt-28 items-center">
      <form className="text-slate-100 w-[700px] text-xl flex flex-col gap-2 border-slate-200 border rounded-md p-5">
        <h1 className="text-4xl text-center m-6">User Information</h1>
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
      </form>
    </div>
  );
}
