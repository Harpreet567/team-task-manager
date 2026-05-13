import { useState } from "react";

import {
  useNavigate,
  Link,
} from "react-router-dom";

import {
  registerUser,
} from "../services/authService";

function RegisterPage() {

  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    role: "Member",
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

      const data = await registerUser(formData);

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
            Build Teams.
            <br />
            Track Everything.
          </h1>

          <p>
            Create projects, assign tasks, and collaborate with your team
            through a powerful productivity dashboard.
          </p>

        </div>

      </div>

      <div className="auth-right">

        <div className="auth-card">

          <h2>Create Account</h2>

          <p>
            Start managing your workflow professionally.
          </p>

          <form onSubmit={handleSubmit}>

            <input
              type="text"
              name="name"
              placeholder="Enter Name"
              value={formData.name}
              onChange={handleChange}
              required
            />

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

            <select
              name="role"
              value={formData.role}
              onChange={handleChange}
            >
              <option>Member</option>
              <option>Admin</option>
            </select>

            <button type="submit" className="btn btn-primary">
              Register
            </button>

          </form>

          <div className="auth-footer">
            Already have an account? <Link to="/">Login</Link>
          </div>

        </div>

      </div>

    </div>
  );
}

export default RegisterPage;
