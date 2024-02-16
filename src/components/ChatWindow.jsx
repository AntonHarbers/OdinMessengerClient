export default function ChatWindow() {
  return (
    <div className="h-[90%] bg-slate-500 w-[90%] rounded-xl flex flex-col pb-2 pr-1 pl-1">
      <div className="h-[10%] flex justify-between items-center">
        <div className="flex gap-6 pl-20">
          <div className=" rounded-full bg-white h-16 w-16"></div>
          <div className=" flex items-center text-slate-100 text-2xl ">
            Chat Group Name
          </div>
        </div>
        <div className="mr-20 hover:scale-125 cursor-pointer transition-all duration-75 active:scale-75 focus:scale-125">
          Settings
        </div>
      </div>
      <div className="h-[80%] flex justify-center items-center ">
        <div className="flex flex-col gap-5 overflow-y-auto bg-slate-200 w-[99.5%] h-full pt-10 rounded-t-xl border-b-2 border-b-slate-200">
          <div className="p-3 mr-20 bg-blue-300 self-end rounded-md">
            Message From
            <div className=" text-sm text-end mb-[-8px]">10:27</div>
          </div>
          <div className="p-3 ml-20 bg-amber-300 self-start rounded-md">
            Message To
            <div className=" text-sm mb-[-8px] text-end">10:28</div>
          </div>
        </div>
      </div>
      <div className="h-[10%] flex justify-center items-center">
        <div className="w-[99.5%] bg-white rounded-b-xl h-full flex">
          <textarea
            className=" rounded-xl w-[90%] h-full resize-none p-2 outline-none"
            name=""
            id=""
          ></textarea>
          <button className="w-[10%] min-w-20 outline-none focus:text-emerald-700 hover:text-emerald-700 active:text-emerald-300 p-2">
            Send
          </button>
        </div>
      </div>
    </div>
  );
}
