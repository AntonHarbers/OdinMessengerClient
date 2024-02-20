/* eslint-disable react/prop-types */
import GroupsPanelItem from './GroupsPanelItem';

export default function GroupsPanel({ userGroups, setCurrentChat }) {
  return (
    <div className="w-[40%] h-full flex-col  flex p-5">
      <div className="h-[10%] text-3xl text-slate-50">Chats</div>
      <div className="h-full">
        {userGroups.map((group) => (
          <div key={group._id} onClick={() => setCurrentChat(group)}>
            <GroupsPanelItem
              name={group.name}
              message={group.message}
              timestamp={new Date(group.created_at).toDateString()}
            />
          </div>
        ))}
      </div>
    </div>
  );
}
