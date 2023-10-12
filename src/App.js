import "./App.css";
import Home from "./Components/Home";
import Navbar from "./Components/Navbar";
import { BrowserRouter as Router, Route, Routes,Navigate  } from "react-router-dom";
import Signup from "./Components/Singup";
import Login from "./Components/Login";
import { useSelector } from "react-redux/es/hooks/useSelector";

function App() {
  const user = useSelector((state) => state.user);
  // user.isLoggedIn
  return (
    <div className="App  ">
      <Router>
        <Navbar />
        <Routes>
          {/* Only show Home component if user.isLoggedIn is true */}
          {user.isLoggedIn && <Route path="/" element={<Home />} />}
          {/* Always show Signup and Login components */}
          <Route path="/signup" element={<Signup />} />
          <Route path="/login" element={<Login />} />
          {/* Redirect to Home if user.isLoggedIn is true, else to Login */}
          <Route
            path="/"
            element={<Navigate to={user.isLoggedIn ? "/" : "/login"} />}
          />
        </Routes>
      </Router>
      {/* <Home/> */}
    </div>
  );
}

export default App;
