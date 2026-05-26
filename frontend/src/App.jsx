import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Provider } from "react-redux";
import Body from "./pages/Body"
import Login from "./pages/Login"
import store from "./app/store";
import Feed from "./pages/Feed";
import Profile from "./pages/Profile";
import Connection from "./pages/Connection";
import Request from "./pages/Request";

const App = () => {
  return (
    <Provider store={store}>
    <BrowserRouter basename="/">
      <Routes>
        <Route path="/" element={<Body />}>
        <Route path="/login" element={<Login />}/>
        <Route path="/feed" element={<Feed />}/>
        <Route path="/profile" element={<Profile />}/>
        <Route path="/connections" element={<Connection />}/>
        <Route path="/requests" element={<Request />}/>
        </Route>
      </Routes>
    </BrowserRouter>
    </Provider>
  )
}

export default App