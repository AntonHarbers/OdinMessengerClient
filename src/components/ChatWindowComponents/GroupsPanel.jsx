/* eslint-disable react/prop-types */
export default function GroupsPanel({ userGroups, setCurrentChat }) {
  return (
    <ul role="list" className="divide-y divide-gray-100 w-[40%]">
      {userGroups.map((group) => (
        <li
          key={group._id}
          className="flex gap-x-4 py-5 cursor-pointer hover:bg-slate-500 hover:rounded-md"
          onClick={() =>
            setCurrentChat((oldChat) => (oldChat == group ? null : group))
          }
        >
          <img
            className="h-12 w-12 flex-none rounded-full"
            src={
              group.profile_pic_url == ''
                ? import.meta.env.VITE_DEFAULT_PIC_URL
                : group.profile_pic_url
            }
            alt=""
          />
          <div className="flex-auto">
            <div className="flex items-baseline justify-between gap-x-4">
              <p className="text-sm font-semibold leading-6 text-slate-100">
                {group.name}
              </p>
              <p className="flex-none text-xs text-gray-600">
                <time dateTime={group.dateTime}>{group.date}</time>
              </p>
            </div>
            <p className="mt-1 line-clamp-2 text-sm leading-6 text-slate-100">
              {group.message}
            </p>
          </div>
        </li>
      ))}
    </ul>
  );
}
