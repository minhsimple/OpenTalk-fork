import React, { useState } from "react";
import authApi from "../api/authApi";
import { useNavigate } from "react-router-dom";

export default function SignUp() {
  const [form, setForm] = useState({
    fullname: "",
    username: "",
    email: "",
    password: "",
    agree: false,
  });

  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setForm({ ...form, [name]: type === "checkbox" ? checked : value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!form.agree) {
      alert("You must agree to the terms.");
      return;
    }
    try {
      const response = await authApi.register({
        fullname: form.fullname,
        username: form.username,
        email: form.email,
        password: form.password,
      });

      if (response.data.code === 0) {
        alert("Registered successfully! Please login.");
        navigate("/login");
      } else {
        alert("Register failed: " + response.data.message);
      }
    } catch (err) {
      console.error(err);
      alert("An error occurred during registration.");
    }
  };

  return (
    <div className="d-flex justify-content-center align-items-center min-vh-100 bg-light">
      <div
        className="bg-white p-5 shadow rounded"
        style={{ width: "100%", maxWidth: 400 }}
      >
        <div className="text-center mb-4">
          {/* <img
            src="https://via.placeholder.com/60x60?text=F"
            alt="Logo"
            className="mb-3"
          /> */}
          <h5 className="fw-bold">Create An Account</h5>
          <p className="text-muted" style={{ fontSize: 14 }}>
            We’d love to have you on board. Join over 500+ customers around the
            globe and enhance productivity.
          </p>
        </div>
        <div className="d-grid gap-2 mb-3">
          <button className="btn btn-outline-primary">
            <i className="bi bi-facebook me-2"></i> Continue with Facebook
          </button>
          <button className="btn btn-outline-danger">
            <i className="bi bi-google me-2"></i> Continue with Google
          </button>
        </div>

        <hr className="my-4" />

        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label className="form-label">
              Full Name<span className="text-danger">*</span>
            </label>
            <input
              type="text"
              name="fullname"
              className="form-control"
              placeholder="Enter your name"
              value={form.fullname}
              onChange={handleChange}
              required
            />
          </div>

          <div className="mb-3">
            <label className="form-label">
              User Name<span className="text-danger">*</span>
            </label>
            <input
              type="text"
              name="username"
              className="form-control"
              placeholder="Enter account username"
              value={form.username}
              onChange={handleChange}
              required
            />
          </div>

          <div className="mb-3">
            <label className="form-label">
              Email<span className="text-danger">*</span>
            </label>
            <input
              type="email"
              name="email"
              className="form-control"
              placeholder="Enter your email"
              value={form.email}
              onChange={handleChange}
              required
            />
          </div>

          <div className="mb-3">
            <label className="form-label">
              Password<span className="text-danger">*</span>
            </label>
            <input
              type="password"
              name="password"
              className="form-control"
              placeholder="Create a password"
              value={form.password}
              onChange={handleChange}
              required
            />
          </div>

          <div className="form-check mb-3">
            <input
              className="form-check-input"
              type="checkbox"
              name="agree"
              checked={form.agree}
              onChange={handleChange}
            />
            <label className="form-check-label">
              I agree to the <a href="#">Terms</a> and{" "}
              <a href="#">Privacy Policy</a>
            </label>
          </div>

          <button type="submit" className="btn btn-dark w-100">
            Sign up
          </button>
        </form>

        <p className="text-center mt-3 small">
          Already have an account? <a href="/login">Login here.</a>
        </p>
      </div>
    </div>
  );
}
