import React, { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import { Outlet, useNavigate } from "react-router-dom";
import Footer from "../components/Footer";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { addUser, setLoading  } from "../features/userSlice";
import { API_URL } from "../utils/constant";
import { addConnections } from "../features/connectionsSlice";

const Body = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  
  const {user} = useSelector((store) => store.user);
  const connections = useSelector((store) => store.connections);

  const fetchUser = async () => {

       if (user) return;
  
     try {
    const { data } = await axios.get(`${API_URL}/profile`, {
      withCredentials: true,
    });

    dispatch(addUser(data.user));
  } catch (err) {
    console.log(err);
  } finally {
    dispatch(setLoading(false));
  }
  };

  
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
    fetchUser();

  }, []);
  
  useEffect(() => {
  if (user?._id) {
    fetchConnections();
  }
}, [user]);

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="grow"><Outlet /></main>
      
      <Footer />
    </div>
  );
};

export default Body;
