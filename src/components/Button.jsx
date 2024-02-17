// eslint-disable-next-line react/prop-types
export default function Button({ value, onClickFunction, customStyles }) {
  return (
    <button
      className={`p-4 border rounded-md text-xl ${customStyles}`}
      onClick={(e) => onClickFunction(e)}
    >
      {value}
    </button>
  );
}
