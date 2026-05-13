import { useState } from "react";

import {
  useNavigate,
  Link,
} from "react-router-dom";

import {
  loginUser,
} from "../services/authService";

function LoginPage() {

  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const handleChange = (e) => {

    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {

    e.preventDefault();

    try {

      const data = await loginUser(formData);

      localStorage.setItem("user", JSON.stringify(data));

      navigate("/dashboard");

    } catch (error) {
      alert(error.response.data.message);
    }
  };

  return (

    <div className="auth-page">

      <div className="auth-left">

        <div className="auth-content">

          <h1>
            Organize Work.
            <br />
            Boost Productivity.
          </h1>

          <p>
            Premium task management platform built for modern teams and seamless collaboration. 
Create projects, assign tasks, track deadlines, and monitor workflow progress with ease. 
Designed with a modern user experience, role-based access control, and productivity-focused features. 
Empowering teams to stay organized, efficient, and connected in one powerful workspace.
          </p>

        </div>

      </div>

      <div className="auth-right">

        <div className="auth-card">

          <h2>Welcome to TaskFlow</h2>

          <p>
            Login/Register to manage your projects and tasks efficiently.
          </p>

          <form onSubmit={handleSubmit}>

            <input
              type="email"
              name="email"
              placeholder="Enter Email"
              value={formData.email}
              onChange={handleChange}
              required
            />

            <input
              type="password"
              name="password"
              placeholder="Enter Password"
              value={formData.password}
              onChange={handleChange}
              required
            />

            <button type="submit" className="btn btn-primary">
              Login
            </button>

          </form>

          <div className="auth-footer">
            Don't have an account? <Link to="/register">Register</Link>
          </div>

        </div>

      </div>

    </div>
  );
}

export default LoginPage;