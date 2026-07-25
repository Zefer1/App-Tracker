import { BrowserRouter, Routes, Route } from "react-router";
import Register from "./pages/Register";
import LoginForm from "./pages/Login"
import Home from "./pages/Home";
import Settings from "./pages/Settings";
import Applications from "./pages/Applications";
import EditApplication from "./pages/EditApplication";
import NewApplication from "./pages/NewApplications";
import ProtectedRoute from "./components/ProtectedRoute";

 
function App() {
  return (
    <BrowserRouter>
    <Routes>
      <Route path="/login" element={<LoginForm/>} />
      <Route path="/register" element={<Register/>} />
      <Route path="/" element={<Home/>} />
      <Route element={<ProtectedRoute />}>
      <Route path="/settings" element={<Settings/>} />
      <Route path="/applications" element={<Applications/>} />
      <Route path="/applications/new" element={<NewApplication/>} />
      <Route path="/applications/:id/edit" element={<EditApplication/>} />
      </Route>
    </Routes>
    </BrowserRouter>
  )
}

export default App
