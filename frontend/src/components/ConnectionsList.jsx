 const ConnectionsList = ({ setSelectedUser, connections, selectedUser}) => (
    <div className="h-full bg-base-100 shadow-lg overflow-y-auto">
      <div className="sticky top-0 bg-base-100 border-b border-base-300 ">
        <h2 className="text-xl font-bold p-4">Connections</h2>
      </div>

      {connections.map((user) => (
        <div
          key={user._id}
          onClick={() => setSelectedUser(user)}
          className={`flex items-center gap-3 p-4 cursor-pointer transition-all duration-200 border-l-4 ${
            selectedUser?._id === user._id
              ? "bg-primary text-primary-content border-primary shadow-md"
              : "border-transparent hover:bg-base-200 hover:border-primary"
          }`}
        >
          <img
            src={user.photoUrl}
            alt=""
            className="w-12 h-12 rounded-full object-cover ring-2 ring-base-300"
          />

          <div>
            <h3 className="font-semibold">
              {user.firstName} {user.lastName}
            </h3>

            <p
              className={`text-sm ${
                selectedUser?._id === user._id
                  ? "text-primary-content/80"
                  : "opacity-60"
              }`}
            >
              Tap to chat
            </p>
          </div>
        </div>
      ))}
    </div>
  );

  export default ConnectionsList;