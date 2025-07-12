import React, { useState, useEffect } from 'react';
import io from 'socket.io-client';
import AuthForm from './components/AuthForm';
import ChatContainer from './components/ChatContainer';

const socket = io('http://localhost:5000');

function App() {
  const [isConnected, setIsConnected] = useState(false);
  const [username, setUsername] = useState('');
  const [messages, setMessages] = useState([]);
  const [users, setUsers] = useState([]);
  const [typingUsers, setTypingUsers] = useState([]);

  useEffect(() => {
    socket.on('connect', () => {
      setIsConnected(true);
      if (username) {
        socket.emit('user_join', username);
      }
    });

    socket.on('disconnect', () => setIsConnected(false));
    socket.on('receive_message', (message) => setMessages(prev => [...prev, message]));
    socket.on('user_list', setUsers);
    socket.on('typing_users', setTypingUsers);

    socket.on('user_joined', (user) => {
      setMessages(prev => [...prev, {
        id: Date.now(),
        system: true,
        message: `${user.username} joined`,
        timestamp: new Date().toISOString()
      }]);
    });

    socket.on('user_left', (user) => {
      setMessages(prev => [...prev, {
        id: Date.now(),
        system: true,
        message: `${user.username} left`,
        timestamp: new Date().toISOString()
      }]);
    });

    return () => {
      socket.off('connect');
      socket.off('disconnect');
      socket.off('receive_message');
      socket.off('user_list');
      socket.off('user_joined');
      socket.off('user_left');
      socket.off('typing_users');
    };
  }, [username]);

  const handleLogin = (username) => {
    setUsername(username);
    if (isConnected) socket.emit('user_join', username);
  };

  const handleSendMessage = (message) => {
    socket.emit('send_message', message);
  };

  const handleTyping = (isTyping) => {
    socket.emit('typing', isTyping);
  };

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center p-4">
      {!username ? (
        <AuthForm onLogin={handleLogin} />
      ) : (
        <ChatContainer
          messages={messages}
          users={users}
          typingUsers={typingUsers}
          currentUser={username}
          onSendMessage={handleSendMessage}
          onTyping={handleTyping}
        />
      )}
    </div>
  );
}

export default App;