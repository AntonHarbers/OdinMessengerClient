/* eslint-disable react/prop-types */
import { useEffect, useRef, useState } from 'react';
import ChatWindow from '../components/ChatWindow';
import { GroupIcon, SearchIcon } from '../utils/icons';
import GroupsPanel from '../components/ChatWindowComponents/GroupsPanel';

export default function Homepage() {
  const [showGroups, setShowGroups] = useState(true);
  const [users, setUsers] = useState([]);
  const [userGroups, setUserGroups] = useState([]);
  const [currentChat, setCurrentChat] = useState(null);
  const loading = useRef(true);

  const HandleToggleGroups = () => {
    setShowGroups(!showGroups);
  };

  const HandleStartNewChat = () => {
    console.log('chat started');
    // Handle starting new group api call here
  };

  useEffect(() => {
    if (!loading.current) return;

    // get all user info from server
    // get all groups that this user is a member of
    setUsers([
      { id: 1, username: 'Tony', email: 'Tony@email.com' },
      { id: 2, username: 'Daniel', email: 'Daniboy' },
    ]);

    const data = [
      {
        _id: 1,
        name: 'Chat 1',
        lastMessage: {
          text: 'Hello World',
          time_sent: '09:17',
        },
      },
    ];

    setUserGroups(data);

    loading.current = false;
  }, []);

  return (
    <div className="w-[calc(100%-150px)] h-full flex-col justify-center items-center">
      <SearchBar users={users} HandleStartNewChat={HandleStartNewChat} />
      <div onClick={HandleToggleGroups} className="absolute top-3 right-3">
        <GroupIcon
          classProps={
            'w-8 h-8 hover:scale-125 cursor-pointer text-white transition-all duration-75 active:scale-75 focus:scale-125 '
          }
        />
      </div>
      <div className="flex h-[93vh] ">
        <ChatWindow
          group={currentChat}
          messages={[
            { _id: 1, sender: 1, message: 'Hello', time_sent: '09:17 pm' },
            { _id: 2, sender: 2, message: 'Hey', time_sent: '09:18 pm' },
            {
              _id: 3,
              sender: 2,
              message: 'How are you',
              time_sent: '09:18 pm',
            },
            {
              _id: 4,
              sender: 1,
              message: 'All good here',
              time_sent: '09:25 pm',
            },
          ]}
          userId={1}
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

function SearchBar({ users, HandleStartNewChat }) {
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
          className=" w-52 outline-none cursor-pointer"
        />
      </div>
      <div className="absolute w-full top-8">
        {searchedUsers.map((user) => (
          <div
            onClick={() => HandleStartNewChat(user.id)}
            key={user.id}
            className={`flex bg-white w-full p-2 border-t-2 items-center rounded-md border-black gap-5 cursor-pointer hover:bg-blue-100`}
          >
            <div className="w-5 h-5 rounded-full bg-slate-300 text-center"></div>
            <div className=" text-blue-600">@{user.username}</div>
          </div>
        ))}
      </div>
    </div>
  );
}
