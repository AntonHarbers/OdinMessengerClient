// eslint-disable-next-line react/prop-types
export default function Message({ userIsSender }) {
  return (
    <div
      className={`${
        userIsSender
          ? 'bg-amber-300 self-start ml-10 '
          : 'bg-blue-300 self-end mr-10 '
      } p-3 rounded-md`}
    >
      Message From
      <div className=" text-sm text-end mb-[-8px]">10:27</div>
    </div>
  );
}
