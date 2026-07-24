import { BrowserRouter, Routes, Route } from "react-router";
import Register from "./pages/Register";
import Login from "./pages/Login"
import Home from "./pages/Home";
import Settings from "./pages/Settings";
import Applications from "./pages/Applications";
import EditApplication from "./components/EditApplication";
import NewApplication from "./components/NewApplications";

 
function App() {
  return (
    <BrowserRouter>
    <Routes>
      <Route path="/login" element={<Login/>} />
      <Route path="/register" element={<Register/>} />
      <Route path="/" element={<Home/>} />
      <Route path="/settings" element={<Settings/>} />
      <Route path="/applications" element={<Applications/>} />
      <Route path="/applications/new" element={<NewApplication/>} />
      <Route path="/applications/:id/edit" element={<EditApplication/>} />
    </Routes>
    </BrowserRouter>
  )
}

export default App
