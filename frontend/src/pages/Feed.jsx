import axios from "axios";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addFeed } from "../features/feedSlice";
import FeedCard from "../components/FeedCard";

const API_URL = import.meta.env.VITE_API_URL;

const Feed = () => {
  const dispatch = useDispatch();

  const users = useSelector((store) => store.feed);

  
  const [hasMore, setHasMore] = useState(true);
  const [loading, setLoading] = useState(false);

  const fetchFeed = async () => {
    if (!hasMore || loading) return;

    try {
      setLoading(true);

      const { data } = await axios.get(
        `${API_URL}/user/feed?limit=3`,
        {
          withCredentials: true,
        }
      );


      if (data.users.length === 0) {
        setHasMore(false);
        return;
      }


      dispatch(addFeed(data.users));
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };


  useEffect(() => {
    fetchFeed();
  }, []);

  useEffect(() => {
    if (users && users.length === 0 && hasMore) {
      fetchFeed();
    }
  }, [users]);

  return (
    <div className="flex justify-center my-10">
      {!hasMore && users.length === 0 ? (
        <div className="flex min-h-[60vh] flex-col items-center justify-center rounded-3xl bg-base-100 p-10 text-center shadow-xl">
          <div className="mb-5 flex h-24 w-24 items-center justify-center rounded-full bg-primary/10 text-5xl">
            📩
          </div>

          <h2 className="text-3xl font-bold">No More Feeds</h2>
        </div>
      ) : loading && users.length === 0 ? (
        <div className="loading loading-spinner loading-lg"></div>
      ) : (
        users.length > 0 && <FeedCard user={users[0]} />
      )}
    </div>
  );
};

export default Feed;