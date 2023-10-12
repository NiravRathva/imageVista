import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { loginUser } from "../Store/userSlice";
import { useSelector } from "react-redux/es/hooks/useSelector";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
const Login = () => {
  const [errorVisible, setErrorVisible] = useState(false);
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  // Get user state from Redux store
  const user = useSelector((state) => state.user);

  const navigate = useNavigate();
  const dispatch = useDispatch();

  // Event handler to update form data state
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Dispatch loginUser action to validate user
    dispatch(loginUser(formData));
    // Clear form fields after submitting
    setFormData({
      email: "",
      password: "",
    });
  };
  useEffect(() => {
    // If user.isLoggedIn becomes true, navigate to "/"
    if (user.isLoggedIn) {
      navigate("/");
    }
  }, [user.isLoggedIn, navigate]);
  
  // Effect to manage error message visibility and timer for error display
  useEffect(() => {
    if (user.loginError !== "") {
      setErrorVisible(true);
      const timer = setTimeout(() => {
        setErrorVisible(false);
      }, 3000);

      return () => {
        clearTimeout(timer);
      };
    }
  }, [user.loginError]);

  return (
    <div className="flex justify-center items-center">
      <div className="mx-auto mt-8 lg:w-1/3  sm:w-2/5 bg-gray-200 border p-8 rounded-lg">
        <h2 className="text-2xl font-bold mb-4 text-gray-800">Login</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className="form-input mt-1 p-2 w-full"
              required
              placeholder="Enter your Email"
            />
          </div>
          <div className="mb-4">
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              className="form-input mt-1 p-2 w-full"
              required
              placeholder="Enter password"
            />
          </div>
          <button
            type="submit"
            className="bg-gray-600 text-white p-2 rounded w-full hover:bg-gray-700"
          >
            Login
          </button>
          {errorVisible && <p className="text-red-300">{user.loginError}</p>}
        </form>
        <div className="mt-4">
          <p className="text-gray-600 text-center">
            Don't have an account?{" "}
            <Link to="/signup" className="text-blue-500 hover:underline">
              Create New Account
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
