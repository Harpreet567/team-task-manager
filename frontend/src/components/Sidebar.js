import { Link, useLocation, useNavigate } from "react-router-dom";
function Sidebar() {

  const location = useLocation();
  const navigate = useNavigate();

  const user = JSON.parse(localStorage.getItem("user"));

  const logoutHandler = () => {
    localStorage.removeItem("user");
    navigate("/");
  };

  return (
    <div className="sidebar">

      <div>

        <div className="logo">
          TaskFlow
        </div>

        <div className="sidebar-links">

          <Link
            to="/dashboard"
            className={location.pathname === "/dashboard" ? "active-link" : "sidebar-link"}
          >
            Dashboard
          </Link>

          <Link
            to="/projects"
            className={location.pathname === "/projects" ? "active-link" : "sidebar-link"}
          >
            Projects
          </Link>

          <Link
            to="/tasks"
            className={location.pathname === "/tasks" ? "active-link" : "sidebar-link"}
          >
            Tasks
          </Link>

        </div>

      </div>

      <div>

        <div className="user-box">
          <p>{user?.name}</p>
          <span>{user?.role}</span>
        </div>

        <button className="btn btn-danger logout-btn" onClick={logoutHandler}>
          Logout
        </button>

      </div>

    </div>
  );
}

export default Sidebar;
