import { useState } from 'react';
import GroupsPanel from './ChatWindowComponents/GroupsPanel';
import ChatHeader from './ChatWindowComponents/ChatHeader';
import Message from './ChatWindowComponents/Message';
import InputField from './ChatWindowComponents/InputField';

export default function ChatWindow() {
  const [showGroups, setShowGroups] = useState(true);

  const HandleToggleGroups = () => {
    setShowGroups(!showGroups);
  };

  return (
    <div className="h-[90%] bg-slate-500 w-[90%] rounded-xl flex pb-2 pr-1 pl-1">
      {showGroups && <GroupsPanel />}
      <div className="h-[100%] w-full">
        <ChatHeader HandleToggleGroups={HandleToggleGroups} />
        <div className="h-[80%] flex justify-center items-center ">
          <div className="flex flex-col gap-5 overflow-y-auto bg-slate-200 w-[99.5%] h-full pt-10 rounded-t-xl border-b-2 border-b-slate-200">
            <Message userIsSender={false} />
            <Message userIsSender={true} />
          </div>
        </div>
        <InputField />
      </div>
    </div>
  );
}
