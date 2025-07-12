export default function TypingIndicator({ typingUsers }) {
  if (typingUsers.length === 0) return null;
  
  return (
    <div className="text-sm text-gray-500 italic mb-2">
      {typingUsers.join(', ')} {typingUsers.length > 1 ? 'are' : 'is'} typing...
    </div>
  );
}