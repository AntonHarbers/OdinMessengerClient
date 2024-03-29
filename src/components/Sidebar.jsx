import { HomeIcon, LogoutIcon, ProfileIcon } from '../utils/icons';
import { Link } from 'react-router-dom';

// eslint-disable-next-line react/prop-types
export default function Sidebar({ setLoggedIn, setUserId, userId }) {
  const HandleLogOut = () => {
    setLoggedIn(false);
    setUserId('');
    localStorage.setItem(import.meta.env.VITE_JWT, '');
  };

  return (
    <div className="flex flex-col border-r border-r-slate-500 h-[100vh] w-[150px] justify-between items-center">
      <div className="flex flex-col gap-16 pt-16">
        <Link
          to={'/'}
          className=" text-slate-300 hover:scale-150 outline-none active:scale-95 transition-all duration-75 flex gap-3"
        >
          <HomeIcon /> Home
        </Link>
        {userId != import.meta.env.VITE_GUEST_ID && (
          <Link
            to={'/profile'}
            className=" text-slate-300 hover:scale-150 outline-none active:scale-95 transition-all duration-75 flex gap-3"
          >
            <ProfileIcon /> Profile
          </Link>
        )}
      </div>
      <div className="flex pb-16">
        <Link
          to={'/'}
          onClick={HandleLogOut}
          className="hover:scale-150 outline-none hover:text-red-600 active:text-red-700 flex gap-3 active:scale-95 transition-all duration-75 text-red-300"
        >
          <LogoutIcon /> Logout
        </Link>
      </div>
    </div>
  );
}
