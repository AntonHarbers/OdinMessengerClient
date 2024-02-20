/* eslint-disable react/prop-types */
import Message from './ChatWindowComponents/Message';
import InputField from './ChatWindowComponents/InputField';
import { SettingsIcon } from '../utils/icons';
import { useEffect } from 'react';

export default function ChatWindow({ group, messages, userId }) {
  // get messages from server whenever chatwindow rerenders
  useEffect(() => {
    console.log('Loading');
  }, [group]);

  return group ? (
    <div className="h-[100%] w-full p-5">
      <div className="h-[90%] flex justify-center items-center ">
        <div className="flex flex-col gap-5 overflow-y-auto bg-slate-200 w-[99.5%] h-full rounded-t-xl border-b-2 border-b-slate-200">
          <div className="flex w-full justify-between pl-5 pr-5 pt-5 items-center">
            <h1 className="text-3xl">{group.name}</h1>
            <SettingsIcon
              classProps={
                'h-8 w-8 hover:scale-125 cursor-pointer transition-all duration-75 active:scale-75 focus:scale-125'
              }
            />
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
