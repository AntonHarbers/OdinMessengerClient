export default function InputField() {
  return (
    <div className="p-1 h-[10%] flex justify-start items-center">
      <div className={`w-[100%] bg-white rounded-b-xl h-full flex`}>
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
  );
}
