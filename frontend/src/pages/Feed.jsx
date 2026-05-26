import axios from "axios";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addFeed } from "../features/feedSlice";
import FeedCard from "../components/FeedCard";
const API_URL = import.meta.env.VITE_API_URL;

const Feed = () => {

    const dispatch = useDispatch();
    const users = useSelector((store) => store.feed);

    const fetchFeed = async () => {
        if(users) return 
        try {
           const { data }  = await axios.get(`${API_URL}/user/feed`,{ withCredentials: true,})
           dispatch(addFeed(data.users));
        } catch (error) {
            console.log(error);
        }
    }

    useEffect(() => {
      fetchFeed();
    },[])
  return (
    <div className="flex justify-center my-10">
        { users && users.length > 0 && <FeedCard user={users[0]}/>}
    </div>
  )
}

export default Feed