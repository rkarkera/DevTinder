import React, { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import { Outlet, useNavigate } from "react-router-dom";
import Footer from "../components/Footer";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { addUser, setLoading  } from "../features/userSlice";
import { API_URL } from "../utils/constant";

const Body = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  
  const {user} = useSelector((store) => store.user);

  const fetchUser = async () => {

       if (user) return;
  
     try {
    const { data } = await axios.get(`${API_URL}/profile`, {
      withCredentials: true,
    });

    dispatch(addUser(data.user));
  } catch (err) {
     if (err.response?.status === 401) {
         navigate("/login");
      }
    console.log(err);
  } finally {
    dispatch(setLoading(false));
  }
  };

  useEffect(() => {
    fetchUser();
  }, []);

  

  return (
    <div>
      <Navbar />
      <Outlet />
      <Footer />
    </div>
  );
};

export default Body;
