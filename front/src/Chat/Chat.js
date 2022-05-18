import { useEffect, useRef, useState } from "react"


export const Chat = () => {
  const [value, setValue] = useState('');
  const [messages, setMessages] = useState([]);
  const [connected, setConnected] = useState(false);
  const [userName, setUserName] = useState('');
  const socket = useRef();

  const sendMessage = () => {
    const message = {
      userName,
      message: value,
      id: Date.now(),
      event: 'message'
    }

    socket.current.send(JSON.stringify(message));
    setValue('');
  }

  const connect = () => {
    socket.current = new WebSocket('ws://localhost:8000');

    socket.current.onopen = () => {
      setConnected(true);

      const message = {
        event: 'connection',
        userName,
        id: Date.now()
      }

      socket.current.send(JSON.stringify(message));
    }

    socket.current.onmessage = (event) => {
      const message = JSON.parse(event.data);
      setMessages(prev => [...prev, message]);
    }

    socket.current.onclose = () => {
      console.log('socket close');
    }

    socket.current.onerror = () => {
      console.log('socket error');
    }
  }

  if (!connected) {
    return (
      <div>
        <div>
          <input value={userName} onChange={e => setUserName(e.target.value)} type='text' />
          <button onClick={connect}>Log In</button>
        </div>
      </div>
    )
  }
  return (
    <div style={{
      display: 'flex',
      justifyContent: 'center'
    }}>
      <div style={{
        display: 'flex',
        flexDirection: 'column',
        gap: '10px',
        border: '1px solid #000',
        padding: '10px',
        margin: '10px',
        width: '30vw'
      }}>
        <input value={value} onChange={e => setValue(e.target.value)} type='text' />
        <button style={{ width: '200px', alignSelf: 'center' }} onClick={sendMessage}>Send</button>
      </div>
      <div className="messagesBlock">
        {messages.map(mes =>
          <div key={mes.id}>
            {mes.event === 'connection'
              ? <div style={{ border: '1px solid #000', padding: '10px', margin: '10px' }}>
                User {mes.userName} connected
              </div>
              : <div style={{ border: '1px solid #000', padding: '10px', margin: '10px' }}>
                {mes.userName} {mes.message}
              </div>
            }
          </div>
        )}
      </div>
    </div>
  )
}