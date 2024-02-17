import { GroupIcon, SettingsIcon } from '../../utils/icons';

// eslint-disable-next-line react/prop-types
export default function ChatHeader({ HandleToggleGroups }) {
  return (
    <div className="h-[10%] flex justify-between items-center">
      <div className="flex gap-6 pl-2">
        <div className=" rounded-full bg-white h-16 w-16"></div>
        <div className=" flex items-center text-slate-100 text-2xl ">
          Chat Group Name
        </div>
      </div>
      <div className="mr-2 flex gap-5 items-center text-white">
        <div onClick={HandleToggleGroups}>
          <GroupIcon
            classProps={
              'w-8 h-8 hover:scale-125 cursor-pointer transition-all duration-75 active:scale-75 focus:scale-125 '
            }
          />
        </div>

        <SettingsIcon
          classProps={
            'h-6 w-6 hover:scale-125 cursor-pointer transition-all duration-75 active:scale-75 focus:scale-125'
          }
        />
      </div>
    </div>
  );
}
