import { configureStore } from "@reduxjs/toolkit";
import userReducer from "../features/userSlice";
import feedReducer  from "../features/feedSlice";
import connectionsReducer from "../features/connectionsSlice";
import requestsReducer from "../features/requestsSlice";

const store = configureStore({
   reducer : {
      user : userReducer,
      feed : feedReducer,
      connections : connectionsReducer,
      requests : requestsReducer
   }
})

export default store;