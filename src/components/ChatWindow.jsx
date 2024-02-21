/* eslint-disable react/prop-types */
import Message from './ChatWindowComponents/Message';
import InputField from './ChatWindowComponents/InputField';
import { SettingsIcon } from '../utils/icons';
import { useEffect, useState } from 'react';
import Button from './Button';

export default function ChatWindow({
  group,
  setGroup,
  userId,
  HandleDeleteChat,
  setUserGroups,
  isDeletingChat,
  setIsDeletingChat,
  showSettings,
  setShowSettings,
}) {
  const [messages, setMessages] = useState([]);
  const [isUpdatingGroupName, setIsUpadtingGroupName] = useState(false);
  const [isUpdatingGroupMessage, setIsUpdatingGroupMessage] = useState(false);

  useEffect(() => {
    console.log('Loading');
    // get messages of this chat from server whenever chatwindow rerenders
    const FetchUserGroupMessages = async () => {
      const response = await fetch(
        `${import.meta.env.VITE_API_PATH}/messages/${group._id}`,
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
        setMessages(data.groupMessages);
      } else {
        console.log('something went wrong');
      }
    };
    if (group == null) {
      return;
    } else {
      FetchUserGroupMessages();
    }
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
      setGroup(data);
    } else {
      console.log('Something went horribly wrong');
    }
  };

  const HandleUpdateGroupNameBtnClick = async () => {
    if (isUpdatingGroupName) {
      const body = {
        name: group.name,
      };
      // make the fetch request
      const response = await fetch(
        `${import.meta.env.VITE_API_PATH}/groups/${group._id}`,
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
        setIsUpadtingGroupName(false);
        const data = await response.json();
        setGroup(data);
        UpdateUserGroupsState(data);
      } else {
        const data = await response.json();
        console.log(data);
      }
    } else {
      setIsUpadtingGroupName(true);
    }
  };

  const HandleUpdateGroupMessageBtnClick = async () => {
    if (isUpdatingGroupMessage) {
      const body = {
        message: group.message,
      };
      // make the fetch request
      const response = await fetch(
        `${import.meta.env.VITE_API_PATH}/groups/${group._id}`,
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
        setIsUpdatingGroupMessage(false);
        const data = await response.json();
        setGroup(data);
        UpdateUserGroupsState(data);
      } else {
        const data = await response.json();
        console.log(data);
      }
    } else {
      setIsUpdatingGroupMessage(true);
    }
  };

  const UpdateUserGroupsState = (updatedGroup) => {
    setUserGroups((oldGroups) => {
      // Find the index of the group you want to update
      const groupIndex = oldGroups.findIndex(
        (group) => group.id === updatedGroup.id
      );

      // If the group is found, update it
      if (groupIndex !== -1) {
        // Create a new array with the updated group
        const newGroups = [
          ...oldGroups.slice(0, groupIndex),
          updatedGroup,
          ...oldGroups.slice(groupIndex + 1),
        ];
        return newGroups;
      }

      // If the group wasn't found, just return the old groups without changes
      return oldGroups;
    });
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
                    } flex`}
                    key={member._id}
                  >
                    {member._id == userId ? (
                      <h1>You, </h1>
                    ) : (
                      <h1 className="">
                        {member.username}
                        {member._id != group.admin._id &&
                          userId == group.admin._id && (
                            <span
                              className="cursor-pointer hover:text-red-600 text-[10px]"
                              onClick={() => RemoveGroupMember(member._id)}
                            >
                              -Kick
                            </span>
                          )}
                        ,
                      </h1>
                    )}
                  </div>
                ))}
              </div>
            </div>

            <div className="relative">
              {group.admin._id == userId && (
                <div>
                  <div onClick={() => setShowSettings(!showSettings)}>
                    <SettingsIcon
                      classProps={
                        'h-8 w-8 hover:scale-125 cursor-pointer transition-all duration-75 active:scale-75 focus:scale-125'
                      }
                    />
                  </div>
                  {showSettings && (
                    <div className="absolute right-0 bg-slate-300 h-auto w-[400px] flex flex-col justify-center items-center">
                      <h1>Chat Settings</h1>
                      <div className="flex gap-2">
                        <label htmlFor="groupName">Group Name:</label>
                        {isUpdatingGroupName ? (
                          <input
                            type="text"
                            id="groupName"
                            value={group.name}
                            onChange={(e) => {
                              const updatedGroup = {
                                ...group,
                                name: e.target.value,
                              };
                              setGroup(updatedGroup);
                            }}
                          />
                        ) : (
                          <h1>{group.name}</h1>
                        )}
                        <button onClick={() => HandleUpdateGroupNameBtnClick()}>
                          {isUpdatingGroupName ? 'Save' : 'Edit'}
                        </button>
                      </div>
                      <div className="flex gap-2">
                        <label htmlFor="groupName">Group Message:</label>
                        {isUpdatingGroupMessage ? (
                          <input
                            type="text"
                            id="groupName"
                            value={group.message}
                            onChange={(e) =>
                              setGroup({
                                ...group,
                                message: e.target.value,
                              })
                            }
                          />
                        ) : (
                          <h1>{group.message}</h1>
                        )}
                        <button
                          onClick={() => HandleUpdateGroupMessageBtnClick()}
                        >
                          {isUpdatingGroupMessage ? 'Save' : 'Edit'}
                        </button>
                      </div>
                      <Button
                        onClickFunction={() =>
                          setIsDeletingChat(!isDeletingChat)
                        }
                        value={isDeletingChat ? 'Undo' : 'Delete Chat'}
                      />
                      {isDeletingChat && (
                        <Button
                          onClickFunction={() => HandleDeleteChat(group._id)}
                          value={'Confirm Chat Deletion'}
                        />
                      )}
                    </div>
                  )}
                </div>
              )}
            </div>
          </div>
          {messages.map((message) => (
            <Message
              key={message._id}
              userIsSender={message.sender._id == userId ? true : false}
              message={message}
            />
          ))}
        </div>
      </div>
      <InputField groupId={group._id} setMessages={setMessages} />
    </div>
  ) : (
    <div className="h-[100%] w-full p-5 flex items-center justify-center text-white">
      Start or open a chat..
    </div>
  );
}
