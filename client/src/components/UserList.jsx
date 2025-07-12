export default function UserList({ users, currentUser }) {
  return (
    <div className="w-64 border-l border-gray-200 p-4 overflow-y-auto">
      <h3 className="font-medium text-gray-700 mb-3">
        Online Users ({users.length})
      </h3>
      <ul className="space-y-2">
        {users.map((user) => (
          <li 
            key={user.id} 
            className={`flex items-center p-2 rounded-md ${
              user.username === currentUser ? 'bg-blue-50 font-medium' : 'hover:bg-gray-50'
            }`}
          >
            <span className="w-2 h-2 rounded-full bg-green-500 mr-2"></span>
            <span>
              {user.username}
              {user.username === currentUser && ' (You)'}
            </span>
          </li>
        ))}
      </ul>
    </div>
  );
}