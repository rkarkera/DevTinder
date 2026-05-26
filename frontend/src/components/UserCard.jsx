const UserCard = ({ user, showActions = false, reviewRequest }) => {
  return (
    <div className="card bg-base-100 shadow-xl transition-all duration-300 hover:-translate-y-1 hover:shadow-2xl">
      <div className="card-body">
        <div className="flex flex-col items-center gap-5 sm:flex-row sm:items-start">
          <img
            src={user.photoUrl}
            alt={`${user.firstName} ${user.lastName}`}
            className="h-28 w-28 rounded-full object-cover ring ring-primary ring-offset-2"
          />

          <div className="flex-1 text-center sm:text-left">
            <h2 className="h-18 overflow-hidden text-2xl font-bold leading-9">
              {user.firstName} {user.lastName}
            </h2>

            <div className="mt-2 flex flex-wrap justify-center gap-2 text-sm sm:justify-start">
              <span className="badge badge-primary badge-outline">
                {user.age} Years
              </span>

              <span className="badge badge-secondary badge-outline">
                {user.gender}
              </span>
            </div>

            <p className="mt-4 text-sm leading-6 text-base-content/80">
              {user.about}
            </p>

            <div className="mt-4 flex flex-wrap justify-center gap-2 sm:justify-start">
              {user.skills?.map((skill) => (
                <span
                  key={skill}
                  className="badge badge-accent badge-soft px-3 py-3"
                >
                  {skill}
                </span>
              ))}
            </div>
          </div>
        </div>

        {showActions && (
          <div className="card-actions mt-6 flex-col gap-3 sm:flex-row sm:justify-end">
            <button className="btn btn-error btn-outline w-full sm:w-auto" onClick={() => reviewRequest("rejected",user._id)}>
              Reject
            </button>

            <button className="btn btn-success w-full sm:w-auto text-white" onClick={() => reviewRequest('accepted',user._id)}>
              Accept
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default UserCard;
