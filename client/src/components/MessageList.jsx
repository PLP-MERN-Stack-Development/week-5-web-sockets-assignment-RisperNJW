export default function MessageList({ messages, currentUser }) {
  return (
    <div className="flex-1 overflow-y-auto mb-4 space-y-3 pr-2">
      {messages.map((msg) => (
        <div 
          key={msg.id} 
          className={`p-3 rounded-lg max-w-[80%] ${
            msg.system 
              ? 'text-center text-gray-500 italic text-sm mx-auto'
              : msg.sender === currentUser
                ? 'bg-blue-100 ml-auto'
                : 'bg-gray-100 mr-auto'
          }`}
        >
          {!msg.system && (
            <div className="flex justify-between items-baseline mb-1">
              <span className="font-semibold text-sm">
                {msg.sender === currentUser ? 'You' : msg.sender}
              </span>
              <span className="text-xs text-gray-500 ml-2">
                {new Date(msg.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
              </span>
            </div>
          )}
          <div className="text-gray-800">{msg.message}</div>
        </div>
      ))}
    </div>
  );
}