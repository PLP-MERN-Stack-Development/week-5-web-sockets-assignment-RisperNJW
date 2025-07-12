import MessageList from './MessageList';
import MessageInput from './MessageInput';
import UserList from './UserList';
import TypingIndicator from './TypingIndicator';

export default function ChatContainer({
  messages,
  users,
  typingUsers,
  currentUser,
  onSendMessage,
  onTyping
}) {
  return (
    <div className="bg-white rounded-lg shadow-lg w-full max-w-6xl h-[600px] flex flex-col">
      <div className="p-4 border-b border-gray-200">
        <h2 className="text-xl font-semibold text-gray-800">Chat App</h2>
        <p className="text-gray-600">Welcome, {currentUser}!</p>
      </div>
      
      <div className="flex flex-1 overflow-hidden">
        <div className="flex-1 flex flex-col p-4 overflow-hidden">
          <MessageList messages={messages} currentUser={currentUser} />
          <TypingIndicator typingUsers={typingUsers} />
          <MessageInput 
            onSendMessage={onSendMessage} 
            onTyping={onTyping}
          />
        </div>
        
        <UserList users={users} currentUser={currentUser} />
      </div>
    </div>
  );
}