/* eslint-disable react/prop-types */
import Message from './ChatWindowComponents/Message';
import InputField from './ChatWindowComponents/InputField';
import { SettingsIcon } from '../utils/icons';
import { useEffect, useState } from 'react';

export default function ChatWindow({
  group,
  setGroup,
  userId,
  HandleDeleteChat,
}) {
  const [showSettings, setShowSettings] = useState(false);
  const [messages, setMessages] = useState([]);
  useEffect(() => {
    console.log('Loading');
    // get messages of this chat from server whenever chatwindow rerenders
    const FetchUserGroupMessages = async () => {
      const response = await fetch();

      if (response.ok) {
        const data = await response.json();

        setMessages(data);
      } else {
        console.log('something went wrong');
      }
    };
  }, [group]);

  const RemoveGroupMember = async (memberId) => {
    console.log(memberId);

    const body = { member: memberId };

    const response = await fetch(
      `${import.meta.env.VITE_API_PATH}/groups/${group._id}/remove`,
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
      // update the group to remove that member locally
      console.log(data);
      data.members = group.members.filter((member) => member._id != memberId);
      data.admin = { _id: userId };
      setGroup(data);
    } else {
      console.log('Something went horribly wrong');
    }
  };

  return group ? (
    <div className="h-[100%] w-full p-5">
      <div className="h-[90%] flex justify-center items-center ">
        <div className="flex flex-col gap-5 overflow-y-auto bg-slate-200 w-[99.5%] h-full rounded-t-xl border-b-2 border-b-slate-200">
          <div className="flex w-full justify-between pl-5 pr-5 pt-5 items-center">
            <div>
              <h1 className="text-3xl">{group.name}</h1>
              <div className="flex gap-1">
                <h1>Members:</h1>
                {group.members.map((member) => (
                  // if you are the admin of this group, then show an x icon next to each name with which you can remove members
                  <div
                    className={`${
                      member._id == group.admin._id ? 'text-orange-600' : ''
                    }`}
                    key={member._id}
                  >
                    {member._id == userId ? (
                      <h1>You</h1>
                    ) : (
                      <h1>
                        {member.username}{' '}
                        {member._id != group.admin._id &&
                          userId == group.admin._id && (
                            <span
                              className="cursor-pointer"
                              onClick={() => RemoveGroupMember(member._id)}
                            >
                              X
                            </span>
                          )}
                      </h1>
                    )}
                    ,
                  </div>
                ))}
              </div>
            </div>

            <div
              className="relative"
              onClick={() => setShowSettings(!showSettings)}
            >
              {group.admin._id == userId && (
                <div>
                  {' '}
                  <SettingsIcon
                    classProps={
                      'h-8 w-8 hover:scale-125 cursor-pointer transition-all duration-75 active:scale-75 focus:scale-125'
                    }
                  />
                  {showSettings && (
                    <div className="absolute right-0 bg-slate-300 h-auto w-[400px] flex flex-col justify-center items-center">
                      <h1>Chat Settings</h1>
                      <button onClick={() => HandleDeleteChat(group._id)}>
                        Delete This Chat
                      </button>
                    </div>
                  )}
                </div>
              )}
            </div>
          </div>
          {messages.map((message) => (
            <Message
              key={message._id}
              userIsSender={message.sender == userId ? true : false}
            />
          ))}
        </div>
      </div>
      <InputField />
    </div>
  ) : (
    <div className="h-[100%] w-full p-5 flex items-center justify-center text-white">
      Start or open a chat..
    </div>
  );
}
