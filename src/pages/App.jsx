import { Route, Routes } from "react-router-dom";
import LandingPage from "./LandingPage";
import Login from "./Login";
import Register from "./Register";

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<LandingPage />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
    </Routes>
  );
}

