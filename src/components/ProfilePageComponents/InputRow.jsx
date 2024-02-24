/* eslint-disable react/prop-types */
// eslint-disable-next-line react/prop-types
export default function InputRow({
  editing,
  labelValue,
  infoValue,
  setValueFunction,
}) {
  return (
    <div className="flex gap-2 w-full justify-between">
      <label htmlFor={labelValue} className="p-2">
        {labelValue}
      </label>
      {editing ? (
        <input
          type="text"
          name={labelValue}
          id={labelValue}
          className="rounded-md p-3 text-center w-[60%] bg-slate-700 text-slate-50 overflow-hidden"
          value={infoValue}
          onChange={(e) => setValueFunction(e.target.value)}
        />
      ) : (
        <p className=" w-[60%] p-3 text-center bg-slate-800 rounded-md overflow-hidden">
          {infoValue}
        </p>
      )}
    </div>
  );
}
