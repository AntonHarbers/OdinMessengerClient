// eslint-disable-next-line react/prop-types
export default function GroupsPanelItem({ name, message, timestamp }) {
  return (
    <div className="bg-white rounded-md p-2 cursor-pointer flex flex-col gap-3">
      <h1 className="text-xl">{name}</h1>
      <div className="flex">
        <p className="w-[80%] text-l">{message}</p>
        <p className=" w-full text-sm  flex justify-end items-end ">
          {timestamp}
        </p>
      </div>
    </div>
  );
}
