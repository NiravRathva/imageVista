import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { addUser } from "../Store/userSlice";
import { Link, useNavigate } from "react-router-dom";
const Signup = () => {
  const dispatch = useDispatch();
  const [formData, setFormData] = useState({
    email: "",
    name: "",
    password: "",
  });
const navigate=useNavigate()
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(addUser(formData));
    // Clear form fields after submitting
    setFormData({
      email: "",
      name: "",
      password: "",
    });
    navigate("/login")
  };

  return (
    <div className="mx-auto mt-8 lg:w-1/3 border p-8 rounded-lg bg-slate-200">
      <h2 className="text-2xl font-bold mb-4 text-gray-800">Create account</h2>
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
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            className="form-input mt-1 p-2 w-full"
            required
            placeholder="Enter Your Name"
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
            minLength={6}
          />
        </div>
        <button
          type="submit"
          className="bg-gray-600 text-white p-2 rounded w-full hover:bg-gray-700"
        >
          Signup
        </button>
      </form>{" "}
      <p className="mt-4 text-gray-600 text-center">
        Already have an account?{" "}
        <Link to="/login" className="text-blue-500 hover:underline">
          Login
        </Link>
      </p>
    </div>
  );
};

export default Signup;
