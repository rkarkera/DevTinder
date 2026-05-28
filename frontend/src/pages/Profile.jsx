import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import FeedCard from "../components/FeedCard";
import axios from "axios";
import { addUser } from "../features/userSlice";
import Toaster from "../components/Toaster";


const API_URL = import.meta.env.VITE_API_URL;

const Profile = () => {
  const user = useSelector((store) => store.user);
  const dispatch = useDispatch();

  const [userProfile, setUserProfile] = useState({
    firstName: user.firstName,
    lastName: user.lastName,
    photoUrl: user.photoUrl,
    age: user.age,
    gender: user.gender,
    about: user.about,
  });
  const [error, setError] = useState();
  const [showToast, setShowToast] = useState(false);
  
  const handleChange = (e) => {
    const { name, value } = e.target;

    setUserProfile((prev) => {
      return { ...prev, [name]: value };
    });
  };

  const handleSubmit = async () => {
    setError("");
    try {
      const { data } = await axios.patch(
        `${API_URL}/profile/edit`,
        userProfile,
        { withCredentials: true },
      );
      dispatch(addUser(data.data));
      setShowToast(true);
      setTimeout(() => {
        setShowToast(false);
      }, 3000);
    } catch (error) {
      setError(error.response?.data?.message);
      console.log(error.response?.data?.message);
    }
  };
  return (
    <>
      <div className="relative flex justify-center gap-6 mt-5 mb-10">
        <div className="card bg-base-300 w-96 shadow-sm">
          <div className="card-body">
            <h2 className="card-title justify-center">Profile</h2>
            <div>
              <fieldset className="fieldset my-1">
                <legend className="fieldset-legend">First Name:</legend>
                <input
                  type="text"
                  className="input"
                  name="firstName"
                  onChange={handleChange}
                  value={userProfile.firstName}
                />
              </fieldset>
            </div>
            <div>
              <fieldset className="fieldset my-1">
                <legend className="fieldset-legend">Last Name:</legend>
                <input
                  type="text"
                  className="input"
                  name="lastName"
                  onChange={handleChange}
                  value={userProfile.lastName}
                />
              </fieldset>
            </div>
            <div>
              <fieldset className="fieldset my-1">
                <legend className="fieldset-legend">Photo URL:</legend>
                <input
                  type="text"
                  className="input"
                  name="photoUrl"
                  onChange={handleChange}
                  value={userProfile.photoUrl}
                />
              </fieldset>
            </div>
            <div>
              <fieldset className="fieldset my-1">
                <legend className="fieldset-legend">Age</legend>
                <input
                  type="text"
                  className="input"
                  name="age"
                  onChange={handleChange}
                  value={userProfile.age}
                />
              </fieldset>
            </div>
            <div>
              <fieldset className="fieldset my-1">
                <legend className="fieldset-legend">Gender:</legend>

                <select
                  className="select"
                  name="gender"
                  onChange={handleChange}
                  value={userProfile.gender}
                >
                  <option value="">Select Gender</option>
                  <option value="male">Male</option>
                  <option value="female">Female</option>
                  <option value="other">Other</option>
                </select>
              </fieldset>
            </div>
            <div>
              <fieldset className="fieldset my-1">
                <legend className="fieldset-legend">About:</legend>
                <input
                  type="text"
                  className="input"
                  name="about"
                  onChange={handleChange}
                  value={userProfile.about}
                />
              </fieldset>
            </div>
            {error && <p className="text-red-500">{error}</p>}
            <div className="card-actions justify-center m-2">
              <button className="btn btn-primary" onClick={handleSubmit}>
                Update User
              </button>
            </div>
          </div>
        </div>
        <FeedCard user={userProfile} />
      </div>
      {showToast && (
        <Toaster msg={"Profile updated Successfully"}/>
      )}
    </>
  );
};

export default Profile;
