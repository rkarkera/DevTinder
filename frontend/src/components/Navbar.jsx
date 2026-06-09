import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { removeUser } from "../features/userSlice";
import { removeFeed } from "../features/feedSlice";
import { removeConnections } from "../features/connectionsSlice";
import { removeRequests } from "../features/requestsSlice";
import { API_URL } from "../utils/constant";

const Navbar = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const logout = async () => {
    try {
      const { data } = await axios.post(
        `${API_URL}/logout`,
        {},
        { withCredentials: true },
      );
      dispatch(removeUser());
      dispatch(removeFeed());
      dispatch(removeConnections());
      dispatch(removeRequests());
      navigate("/login");
    } catch (error) {
      console.log(err);
    }
  };

  const { user } = useSelector((store) => store.user);
  return (
    <div className=" z-10 navbar bg-base-300 shadow-sm sticky top-0">
      <div className="flex-1">
        <Link to="/feed" className="btn btn-ghost text-xl">
          🧑‍💻 DevTinder
        </Link>
      </div>
      {user && (
        <div className="flex gap-2 items-center flex-non ">
          <div className=" flex items-center">
            <h3 className="hidden md:block">Welcome, {user.firstName}</h3>
          </div>
          <div className="dropdown dropdown-end mr-5">
            <div
              tabIndex={0}
              role="button"
              className="btn btn-ghost btn-circle avatar relative"
            >
              <div className="w-10 rounded-full">
                <img alt="user photo" src={user.photoUrl} />
              </div>

              {user?.isPremium && (
                <span
                  className={`absolute -top-2 -right-4 badge badge-sm ${
                    user.package === "gold"
                      ? "badge-warning"
                      : "badge-secondary"
                  }`}
                >
                  {user.package}
                </span>
              )}
            </div>
            <ul
              tabIndex="-1"
              className="menu menu-sm dropdown-content bg-base-100 rounded-box z-1000 mt-3 w-52 p-2 shadow"
            >
              <li>
                <Link to="/profile" className="justify-between">
                  Profile
                </Link>
              </li>
              <li>
                <Link to="/premium">Premium</Link>
              </li>
              <li>
                <Link to="/connections">Connections</Link>
              </li>
              <li>
                <Link to="/requests">Requests</Link>
              </li>
              <li>
                <Link to="/chat">Chat</Link>
              </li>
              <li>
                <a onClick={logout}>Logout</a>
              </li>
            </ul>
          </div>
        </div>
      )}
    </div>
  );
};

export default Navbar;
