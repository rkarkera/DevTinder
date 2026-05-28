import { useState } from "react";
import axios from "axios";
import { useDispatch } from "react-redux";
import { addUser } from "../features/userSlice";
import { Link, useNavigate } from "react-router-dom";
import Toaster from "../components/Toaster";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { API_URL } from "../utils/constant";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [age, setAge] = useState("");
  const [gender, setGender] = useState("");
  const [showToast, setShowToast] = useState(false);
  const [toastMessage, setToastMessage] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const [error, setError] = useState("");
  const [isSignup, setIsSignup] = useState(false);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleSubmit = async () => {
    setError("");
    try {
      const { data } = await axios.post(
        `${API_URL}/login`,
        { email, password },
        { withCredentials: true },
      );
      dispatch(addUser(data.user));
      setToastMessage("User LoggedIn Successfully");
      setShowToast(true);
      setTimeout(() => {
        setShowToast(false);
        navigate("/feed");
      }, 1000);
    } catch (error) {
      setError(error.response?.data?.message);
      console.log(error.response?.data?.message);
    }
  };

  const handleSignup = async () => {
    setError("");
    try {
      const { data } = await axios.post(
        `${API_URL}/signup`,
        { firstName, lastName, age, email, password, gender },
        { withCredentials: true },
      );
      dispatch(addUser(data.user));
      setToastMessage("User LoggedIn Successfully");
      setShowToast(true);
      setTimeout(() => {
        setShowToast(false);
        navigate("/profile");
      }, 1000);
    } catch (error) {
      setError(error.response?.data?.message);
    }
  };

  return (
    <div className="flex justify-center my-10">
      <div className="card bg-base-300 w-96 shadow-sm">
        <div className="card-body">
          <h2 className="card-title justify-center">
            {isSignup ? "Sign up" : "Login"}
          </h2>
          {isSignup && (
            <>
              <div>
                <fieldset className="fieldset my-1">
                  <legend className="fieldset-legend">First Name:</legend>
                  <input
                    type="text"
                    className="input"
                    value={firstName}
                    onChange={(e) => setFirstName(e.target.value)}
                  />
                </fieldset>
              </div>
              <div>
                <fieldset className="fieldset my-1">
                  <legend className="fieldset-legend">Last Name:</legend>
                  <input
                    type="text"
                    className="input"
                    value={lastName}
                    onChange={(e) => setLastName(e.target.value)}
                  />
                </fieldset>
              </div>
              <div>
                <fieldset className="fieldset my-1">
                  <legend className="fieldset-legend">Age</legend>
                  <input
                    type="text"
                    className="input"
                    value={age}
                    onChange={(e) => setAge(e.target.value)}
                  />
                </fieldset>
              </div>
              <div>
                <fieldset className="fieldset my-1">
                  <legend className="fieldset-legend">Gender:</legend>

                  <select
                    className="select"
                    name="gender"
                    onChange={(e) => setGender(e.target.value)}
                    value={gender}
                  >
                    <option value="">Select Gender</option>
                    <option value="male">Male</option>
                    <option value="female">Female</option>
                    <option value="other">Other</option>
                  </select>
                </fieldset>
              </div>
            </>
          )}
          <div>
            <fieldset className="fieldset my-1">
              <legend className="fieldset-legend">Email ID</legend>
              <input
                type="text"
                className="input w-full pr-12"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </fieldset>
          </div>
          <div>
            <fieldset className="fieldset my-1">
              <legend className="fieldset-legend">Password</legend>

              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  className="input w-full pr-12"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />

                <button
                  type="button"
                  className="absolute top-1/2 right-3 -translate-y-1/2 text-lg"
                  onClick={() => setShowPassword((prev) => !prev)}
                >
                  {showPassword ? <FaEyeSlash /> : <FaEye />}
                </button>
              </div>
            </fieldset>
          </div>
          {error && <p className="text-red-500">{error}</p>}
          <div className="card-actions justify-center m-2">
            <button
              className="btn btn-primary"
              onClick={isSignup ? handleSignup : handleSubmit}
            >
              {isSignup ? "Sign up" : "Login"}
            </button>
          </div>
          <button onClick={() => setIsSignup((prev) => !prev)}>
            {isSignup ? "Login Page" : "Create account ? signup"}
          </button>
        </div>
      </div>
      {showToast && <Toaster msg={toastMessage} />}
    </div>
  );
};

export default Login;
