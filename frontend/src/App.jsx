import { BrowserRouter, Routes, Route, Link } from "react-router-dom";

import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import AddCafe from "./pages/AddCafe";

function App() {
  return (
    <BrowserRouter>
      <nav>
        <Link to="/">☕ CoffeeMood</Link>
        <Link to="/login">Login</Link>
        <Link to="/register">Register</Link>
        <Link to="/add-cafe">Add Cafe</Link>
      </nav>

      <div className="container">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/add-cafe" element={<AddCafe />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;