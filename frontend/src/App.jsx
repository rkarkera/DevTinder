import { BrowserRouter, Route, Routes } from "react-router-dom"
import Body from "./pages/Body"

const App = () => {
  return (
    <BrowserRouter basename="/">
      <Routes>
        <Route path="/" element={<Body />}>
        <Route path="/login" element={<div>Login page</div>}/>
        <Route path="/feed" element={<div>feed page</div>}/>
        </Route>
      </Routes>
    </BrowserRouter>
  )
}

export default App