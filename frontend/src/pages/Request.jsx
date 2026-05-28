import axios from "axios";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addRequests, removeRequests } from "../features/requestsSlice";
import UserCard from "../components/UserCard";
import Toaster from "../components/Toaster";
const API_URL = import.meta.env.VITE_API_URL;

const Request = () => {
  const dispatch = useDispatch();
  const requests = useSelector((store) => store.requests);
  const [showToast, setShowToast] = useState(false);
  const [toastMessage, setToastMessage] = useState("");

  const fetchRequests = async () => {
    try {
      const { data } = await axios.get(`${API_URL}/user/request/received`, {
        withCredentials: true,
      });
      dispatch(addRequests(data.requests));
    } catch (error) {
      console.error(error.response?.data?.message);
    }
  };

  useEffect(() => {
    fetchRequests();
  }, []);

  const reviewRequest = async (status, id) => {
    try {
      const { data } = await axios.post(
        `${API_URL}/request/review/${status}/${id}`,{},{withCredentials:true}
      );
      dispatch(removeRequests(id));

          setToastMessage(
      status === "accepted"
        ? "Request Accepted Successfully"
        : "Request Rejected Successfully"
    );

    setShowToast(true);
      setTimeout(() => {
        setShowToast(false);
      }, 3000);
    } catch (error) {
      console.error(error.response?.data?.message);
    }
  };

  return (
    <div className="min-h-screen bg-base-200 px-4 py-8 md:px-8">
      <div className="mx-auto max-w-7xl">
        <h1 className="mb-8 text-center text-3xl font-bold md:text-4xl">
          Requests
        </h1>

        {requests.length == 0 ? (
          <div className="flex min-h-[60vh] flex-col items-center justify-center rounded-3xl bg-base-100 p-10 text-center shadow-xl">
            <div className="mb-5 flex h-24 w-24 items-center justify-center rounded-full bg-primary/10 text-5xl">
              📩
            </div>

            <h2 className="text-3xl font-bold">No Requests Found</h2>

            <p className="mt-3 max-w-md text-base-content/70">
              You don’t have any pending requests right now.
            </p>
          </div>
        ) : (
          <div className="min-h-screen bg-base-200 px-4 py-8 md:px-8">
            <div className="mx-auto max-w-7xl">
              <div className="grid grid-cols-1 gap-6 md:grid-cols-2 xl:grid-cols-3">
                {requests.map((user) => (
                  <UserCard
                    key={user._id}
                    user={user.fromUserId}
                    showActions={true}
                    reviewRequest={reviewRequest}
                    id={user._id}
                  />
                ))}
              </div>
            </div>
          </div>
        )}
      </div>
      {showToast && (
        <Toaster msg={toastMessage}/>
      )}
    </div>
  );
};

export default Request;
