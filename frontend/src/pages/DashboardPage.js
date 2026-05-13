import {
  useEffect,
  useState,
} from "react";

import Layout from "../components/Layout";

import {
  getProjects,
} from "../services/projectService";

import {
  getDashboardStats,
} from "../services/taskService";

function DashboardPage() {

  const user = JSON.parse(localStorage.getItem("user"));

  const [projectCount, setProjectCount] = useState(0);

  const [stats, setStats] = useState({
    totalTasks: 0,
    completedTasks: 0,
    overdueTasks: 0,
  });

  const fetchProjects = async () => {

    try {

      const projects = await getProjects();
      setProjectCount(projects.length);

    } catch (error) {
      console.log(error);
    }
  };

  const fetchStats = async () => {

    try {

      const data = await getDashboardStats();
      setStats(data);

    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchProjects();
    fetchStats();
  }, []);

  return (

    <Layout>

      <div className="page-header">

        <h1>
          Welcome back, {user?.name}
        </h1>

        <p>
        Turn your goals into achievements with seamless collaboration and focused productivity.
        </p>

      </div>

      <div className="grid">

        <div className="card stat-card">
          <p>Total Projects</p>
          <h2>{projectCount}</h2>
        </div>

        <div className="card stat-card">
          <p>Total Tasks</p>
          <h2>{stats.totalTasks}</h2>
        </div>

        <div className="card stat-card">
          <p>Completed Tasks</p>
          <h2>{stats.completedTasks}</h2>
        </div>

        <div className="card stat-card">
          <p>Overdue Tasks</p>
          <h2>{stats.overdueTasks}</h2>
        </div>

      </div>

    </Layout>
  );
}

export default DashboardPage;
