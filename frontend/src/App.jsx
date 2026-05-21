import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Provider } from "react-redux";
import Body from "./pages/Body"
import Login from "./pages/Login"
import store from "./app/store";

const App = () => {
  return (
    <Provider store={store}>
    <BrowserRouter basename="/">
      <Routes>
        <Route path="/" element={<Body />}>
        <Route path="/login" element={<Login />}/>
        <Route path="/feed" element={<div>feed page</div>}/>
        </Route>
      </Routes>
    </BrowserRouter>
    </Provider>
  )
}

export default App