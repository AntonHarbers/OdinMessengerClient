import { useEffect, useRef, useState } from 'react';

function App() {
  const [state, setState] = useState('state');
  const loading = useRef(true);

  useEffect(() => {
    if (!loading.current) return;
    setState('newState');
  }, []);

  return <div className=" text-4xl">Hello World: {state}</div>;
}

export default App;
