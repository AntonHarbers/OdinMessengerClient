/* eslint-disable react/prop-types */
import { useEffect, useState } from 'react';
import ChatWindow from '../components/ChatWindow';
import { GroupIcon, SearchIcon } from '../utils/icons';
import GroupsPanel from '../components/ChatWindowComponents/GroupsPanel';
import Button from '../components/Button';

export default function Homepage({ userId }) {
  const [showGroups, setShowGroups] = useState(true);
  const [users, setUsers] = useState([]);
  const [userGroups, setUserGroups] = useState([]);
  const [currentChat, setCurrentChat] = useState(null);
  const [isDeletingChat, setIsDeletingChat] = useState(false);
  const [showSettings, setShowSettings] = useState(false);

  useEffect(() => {
    setShowSettings(false);
    setIsDeletingChat(false);
  }, [currentChat]);

  useEffect(() => {
    const JWT = localStorage.getItem(import.meta.env.VITE_JWT);
    if (!JWT) return;

    const FetchAllUsers = async () => {
      const response = await fetch(`${import.meta.env.VITE_API_PATH}/users`, {
        headers: {
          Authorization: `Bearer ${JWT}`,
        },
      });

      if (response.ok) {
        const data = await response.json();
        setUsers(
          data
            .filter((user) => user.username != 'Deleted User')
            .filter((user) => user._id != userId)
        );
      } else {
        console.log('something went wrong');
      }
    };

    const FetchUserGroups = async () => {
      const response = await fetch(`${import.meta.env.VITE_API_PATH}/groups`, {
        headers: {
          Authorization: `Bearer ${JWT}`,
        },
      });

      if (response.ok) {
        const data = await response.json();
        console.log(data);
        setUserGroups(data);
      } else {
        console.log('something went wrong');
      }
    };

    try {
      FetchAllUsers();
      FetchUserGroups();
    } catch (e) {
      console.log(e);
    }
  }, [userId]);

  const HandleStartNewChat = async (otherUser) => {
    const JWT = localStorage.getItem(import.meta.env.VITE_JWT);
    console.log(otherUser);
    const body = {
      name: 'New Chat',
      admin: userId,
      members: [userId, otherUser._id],
    };

    // Handle starting new group api call here
    const response = await fetch(`${import.meta.env.VITE_API_PATH}/groups`, {
      method: 'POST',
      mode: 'cors',
      headers: {
        Authorization: `Bearer ${JWT}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(body),
    });

    if (response.ok) {
      const data = await response.json();
      setUserGroups((currentGroups) => [...currentGroups, data]);
      setCurrentChat(data);
    } else {
      console.log('something went wrong');
    }
  };

  const HandleAddUserToChat = async (otherUser) => {
    const body = { member: otherUser._id };
    const response = await fetch(
      `${import.meta.env.VITE_API_PATH}/groups/${currentChat._id}/add`,
      {
        method: 'PATCH',
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
      setCurrentChat(data);
    } else {
      console.log('Something went horribly wrong');
    }
  };

  const HandleDeleteChat = async (chatId) => {
    const JWT = localStorage.getItem(import.meta.env.VITE_JWT);

    const response = await fetch(
      `${import.meta.env.VITE_API_PATH}/groups/${chatId}`,
      {
        method: 'DELETE',
        mode: 'cors',
        headers: {
          Authorization: `Bearer ${JWT}`,
        },
      }
    );

    if (response.ok) {
      setCurrentChat(null);
      setUserGroups(userGroups.filter((group) => group._id != chatId));
      setIsDeletingChat(false);
      setShowSettings(false);
    } else {
      console.log('something went wrong');
    }
  };

  return (
    <div className="w-[calc(100%-150px)] h-full flex-col justify-center items-center">
      <SearchBar
        currentChat={currentChat}
        users={users}
        HandleStartNewChat={HandleStartNewChat}
        HandleAddUserToChat={HandleAddUserToChat}
      />
      <div
        onClick={() => setShowGroups(!showGroups)}
        className="absolute top-3 right-3"
      >
        <GroupIcon
          classProps={
            'w-8 h-8 hover:scale-125 cursor-pointer text-white transition-all duration-75 active:scale-75 focus:scale-125 '
          }
        />
      </div>
      <div className="flex h-[93vh] ">
        <ChatWindow
          group={currentChat}
          setGroup={setCurrentChat}
          userId={userId}
          HandleDeleteChat={HandleDeleteChat}
          setUserGroups={setUserGroups}
          isDeletingChat={isDeletingChat}
          setIsDeletingChat={setIsDeletingChat}
          showSettings={showSettings}
          setShowSettings={setShowSettings}
        />

        {showGroups && (
          <GroupsPanel
            userGroups={userGroups}
            setCurrentChat={setCurrentChat}
          />
        )}
      </div>
    </div>
  );
}

function SearchBar({
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
