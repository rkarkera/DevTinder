import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Provider } from "react-redux";
import Body from "./pages/Body"
import Login from "./pages/Login"
import store from "./app/store";
import Feed from "./pages/Feed";
import Profile from "./pages/Profile";
import Connection from "./pages/Connection";
import Request from "./pages/Request";
import ProtectedRoute from "./components/ProtectedRoute";
import PublicRoute from "./components/PublicRoute";

const App = () => {
  return (
    <Provider store={store}>
    <BrowserRouter basename="/">
      <Routes>
        <Route path="/" element={<Body />}>
        <Route path="/login" element={<PublicRoute><Login /></PublicRoute>}/>
        <Route path="/feed" element={<ProtectedRoute><Feed /></ProtectedRoute>}/>
        <Route path="/profile" element={<ProtectedRoute><Profile /></ProtectedRoute>}/>
        <Route path="/connections" element={<ProtectedRoute><Connection /></ProtectedRoute>}/>
        <Route path="/requests" element={<ProtectedRoute><Request /></ProtectedRoute>}/>
        </Route>
      </Routes>
    </BrowserRouter>
    </Provider>
  )
}

export default App