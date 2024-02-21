/* eslint-disable react/prop-types */
// eslint-disable-next-line react/prop-types
export default function Message({ userIsSender, message }) {
  return (
    <div
      className={`${
        userIsSender
          ? 'bg-amber-300 self-start ml-10 '
          : 'bg-blue-300 self-end mr-10 '
      } p-4 rounded-md`}
    >
      <div className="pb-2 pr-10">{message.content}</div>

      <div className=" text-xs text-end mb-[-8px]">
        {userIsSender ? 'You' : message.sender.username}{' '}
        {new Date(message.created_at).getHours()}:
        {new Date(message.created_at).getMinutes()}{' '}
        {new Date(message.created_at).getDate()}/
        {new Date(message.created_at).getMonth() + 1}
      </div>
    </div>
  );
}
