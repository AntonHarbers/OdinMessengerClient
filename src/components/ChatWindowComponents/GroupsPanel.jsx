import GroupsPanelItem from './GroupsPanelItem';

export default function GroupsPanel() {
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
  return (
    <div className="w-[40%] h-full flex-col  flex p-5">
      <div className="h-[10%] text-3xl text-slate-50">Chats</div>
      <div className="h-full">
        {data.map((item) => (
          <GroupsPanelItem
            key={item._id}
            name={item.name}
            message={item.lastMessage.text}
            timestamp={item.lastMessage.time_sent}
          />
        ))}
      </div>
    </div>
  );
}
