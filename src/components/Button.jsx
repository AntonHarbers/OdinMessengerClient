// eslint-disable-next-line react/prop-types
export default function Button({ value, onClickFunction, customStyles }) {
  return (
    <button
      className={`rounded px-2 py-1 text-xl font-semibold text-white shadow-sm focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-500 ${customStyles}`}
      onClick={(e) => onClickFunction(e)}
    >
      {value}
    </button>
  );
}
