import axios from "axios";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addConnections } from "../features/connectionsSlice";
import UserCard from "../components/UserCard";

const API_URL = import.meta.env.VITE_API_URL;

const Connection = () => {
  const dispatch = useDispatch();
  const connections = useSelector((store) => store.connections);
  const fetchConnections = async () => {
    try {
      const { data } = await axios.get(`${API_URL}/user/connections`, {
        withCredentials: true,
      });
      dispatch(addConnections(data));
    } catch (error) {
      console.error(error.response?.data?.message);
    }
  };

  useEffect(() => {
    fetchConnections();
  }, []);
  return (
    <div className="min-h-screen bg-base-200 px-4 py-8 md:px-8">
      <div className="mx-auto max-w-7xl">
        <h1 className="mb-8 text-center text-3xl font-bold md:text-4xl">
          Connections
        </h1>

        {connections.length == 0 ? (
          <div className="flex min-h-[60vh] flex-col items-center justify-center rounded-3xl bg-base-100 p-10 text-center shadow-xl">
            <div className="mb-5 flex h-24 w-24 items-center justify-center rounded-full bg-primary/10 text-5xl">
              🤝
            </div>

            <h2 className="text-3xl font-bold">No Connections Found</h2>

            <p className="mt-3 max-w-md text-base-content/70">
              You don’t have any connections yet. Start exploring profiles and
              connect with amazing people.
            </p>

            <button className="btn btn-primary mt-6">Explore Users</button>
          </div>
        ) : (
          <div className="min-h-screen bg-base-200 px-4 py-8 md:px-8">
            <div className="mx-auto max-w-7xl">
              <div className="grid grid-cols-1 gap-6 md:grid-cols-2 xl:grid-cols-3">
                {
                  connections.map((user) => (
                    <UserCard key={user._id} user={user} />
                  ))}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Connection;
