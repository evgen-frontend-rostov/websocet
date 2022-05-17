import { useEffect, useRef, useState } from "react"


export const Chat = () => {
  const [connected, setConnected] = useState(false);
  const [userName, setUserName] = useState('');
  const socket = useRef();

  useEffect(() => {
    socket.current = new WebSocket('ws://localhost:8000');

    socket.current.onopen = () => {
      setConnected(true);
    }

    socket.current.onmessage = () => {
      
    }

    socket.current.onclose = () => {
      console.log('socket close');
    }

    socket.current.onerror = () => {
      console.log('socket error');
    }
  }, [])

  if (!connected) {
    return (
      <div>
        <div>
          <input value={userName} onChange={e => setUserName(e.target.value)} type='text'/>
          <button>Log In</button>
        </div>
      </div>
    )
  }
  return (
    <div>
        
    </div>
  )
}