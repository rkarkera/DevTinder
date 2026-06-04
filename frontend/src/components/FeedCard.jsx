import axios from "axios";
import { useDispatch } from "react-redux";
import { removeFeed } from "../features/feedSlice";
import Toaster from "./Toaster";
import { useState } from "react";
import { API_URL } from "../utils/constant";



const FeedCard = ({ user , isPreview=false}) => {
  const { _id, firstName, lastName, age, about, photoUrl, gender } = user;
  const dispatch = useDispatch();

  const [showToast, setShowToast] = useState(false);
  const [toastMessage, setToastMessage] = useState("");

  const sendConnection = async (status) => {
    try {
      const { data } = await axios.post(
        `${API_URL}/request/send/${status}/${_id}`,
        {},
        { withCredentials: true },
      );

      dispatch(removeFeed(_id));
      setToastMessage(
        status === "ignored"
          ? `You Ignored ${firstName}`
          : `Connection request sent to  ${firstName}`,
      );
      setShowToast(true);
      setTimeout(() => {
        setShowToast(false);
      }, 1000);
    } catch (error) {
      console.error(error.response?.data?.message);
    }
  };
  return (
    <div className="card bg-base-300 w-full max-w-md shadow-xl">
      <figure className="px-6 pt-6">
        <img
  src={photoUrl}
  alt="user photo"
  className="rounded-xl h-72 w-full object-cover"
/>
      </figure>
      <div className="card-body items-center text-center">
        <h2 className="card-title">{`${firstName} ${lastName}`}</h2>
        <p className="text-sm text-base-content/80 wrap-break-word">
  {about}
</p>
        <p className="font-medium">
  Age: {age} • {gender}
</p>
        <div className="card-actions my-3">
          <button
            className="btn btn-primary"
            onClick={() => sendConnection("ignored")}
            disabled={isPreview}
          >
            Ignore
          </button>
          <button
            className="btn btn-secondary"
            onClick={() => sendConnection("interested")}
            disabled={isPreview}
          >
            Interested
          </button>
        </div>
      </div>
      {showToast && <Toaster msg={toastMessage} />}
    </div>
  );
};

export default FeedCard;
