/* eslint-disable react/prop-types */
import GroupsPanelItem from './GroupsPanelItem';

export default function GroupsPanel({ userGroups, setCurrentChat }) {
  return (
    <div className="w-[40%] h-full flex-col  flex p-5">
      <div className="h-[10%] text-3xl text-slate-50">Chats</div>
      <div className="h-full">
        {userGroups.map((item) => (
          <div key={item._id} onClick={() => setCurrentChat(item)}>
            <GroupsPanelItem
              name={item.name}
              message={item.lastMessage.text}
              timestamp={item.lastMessage.time_sent}
            />
          </div>
        ))}
      </div>
    </div>
  );
}
