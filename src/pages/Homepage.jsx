import ChatWindow from '../components/ChatWindow';

export default function Homepage() {
  return (
    <div className="w-[calc(100%-150px)] flex flex-col justify-center items-center">
      <ChatWindow />
    </div>
  );
}
