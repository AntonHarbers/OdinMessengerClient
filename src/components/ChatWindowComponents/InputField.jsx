import { useState } from 'react';

// eslint-disable-next-line react/prop-types
export default function InputField({ groupId, setMessages }) {
  const [text, setText] = useState('');
  const HandleSendMessage = async () => {
    // input validation
    if (text.trim() == '') return;

    const body = {
      // see whats needed
      content: text,
      group: groupId,
    };
    const response = await fetch(`${import.meta.env.VITE_API_PATH}/messages`, {
      method: 'POST',
      mode: 'cors',
      headers: {
        Authorization: `Bearer ${localStorage.getItem(
          import.meta.env.VITE_JWT
        )}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(body),
    });

    if (response.ok) {
      const data = await response.json();
      console.log(data);
      setMessages((oldMessages) => [...oldMessages, data]);
      setText('');
    } else {
      console.log('Something went Wrong');
    }
  };

  return (
    <div className="p-1 h-[10%] flex justify-start items-center">
      <div className={`w-[100%] bg-white rounded-b-xl h-full flex`}>
        <textarea
          className=" rounded-xl w-[90%] h-full resize-none p-2 outline-none"
          name=""
          id=""
          value={text}
          onChange={(e) => setText(e.target.value)}
        ></textarea>
        <button
          onClick={HandleSendMessage}
          className="w-[10%] min-w-20 outline-none focus:text-emerald-700 hover:text-emerald-700 active:text-emerald-300 p-2"
        >
          Send
        </button>
      </div>
    </div>
  );
}
