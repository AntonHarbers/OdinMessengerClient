export default function GroupsPanel() {
  return (
    <div className="w-[40%] h-full flex-col  flex p-5">
      <div className="h-[10%] text-3xl text-slate-50">Chats</div>
      <div className="h-full">
        <div className="bg-white rounded-md p-2 cursor-pointer flex flex-col gap-3">
          <h1 className="text-xl">Group Name</h1>
          <div className="flex">
            <p className="w-[80%] text-l">Group last message</p>
            <p className=" w-full text-sm  flex justify-end items-end ">
              09:17
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
