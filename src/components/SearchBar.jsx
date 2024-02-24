/* eslint-disable react/prop-types */
import { useState } from 'react';
import { SearchIcon } from '../utils/icons';
import Button from './Button';

export default function SearchBar({
  currentChat,
  users,
  HandleStartNewChat,
  HandleAddUserToChat,
}) {
  const [searchVal, setSearchVal] = useState('');
  const [searchedUsers, setSearchUsers] = useState([]);

  const HandleUserSearchInput = (e) => {
    setSearchUsers([]);
    setSearchVal(e.target.value);
    if (e.target.value.length < 1) return;

    const userInput = e.target.value.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
    const regexPattern = new RegExp(userInput, 'i'); // 'i' for case-insensitive, remove if not needed
    setSearchUsers(users.filter((user) => regexPattern.test(user.username)));
  };
  return (
    <div className="flex flex-col w-[50%] ml-auto mr-auto m-5 relative h-[20px] ">
      <div className="bg-white rounded-md p-1 flex items-center">
        <label htmlFor="searchbar">
          <SearchIcon
            classProps={
              'w-5 h-5 mr-2 ml-2 cursor-pointer hover:scale-110 hover:text-slate-500'
            }
          />
        </label>
        <input
          value={searchVal}
          onChange={HandleUserSearchInput}
          id="searchbar"
          type="text"
          onBlur={() =>
            setTimeout(() => {
              setSearchUsers([]);
              setSearchVal('');
            }, 150)
          }
          className=" w-full outline-none cursor-pointer"
        />
      </div>
      <div className="absolute w-full top-8">
        {searchedUsers.map((user) => (
          <div
            key={user._id}
            className={`flex bg-white w-full justify-between p-2 border-t-2 items-center rounded-md border-black gap-5`}
          >
            <div className=" text-blue-600 text-4xl">@{user.username}</div>
            <div>
              <Button
                onClickFunction={() => HandleStartNewChat(user)}
                customStyles={'bg-green-400 hover:bg-green-300'}
                value={'New Chat'}
              />
              {/* Show add to current chat button if current chat is not null */}
              {currentChat != null &&
                !currentChat.members.some(
                  (member) => member._id === user._id
                ) && (
                  <Button
                    onClickFunction={() => HandleAddUserToChat(user)}
                    customStyles={'bg-yellow-400 hover:bg-yellow-300'}
                    value={'Add to Chat'}
                  />
                )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
