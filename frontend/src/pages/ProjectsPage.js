import {
  useEffect,
  useState,
} from "react";

import Layout from "../components/Layout";

import {
  createProject,
  getProjects,
  deleteProject,
} from "../services/projectService";

function ProjectsPage() {

  const user = JSON.parse(localStorage.getItem("user"));

  const [projects, setProjects] = useState([]);

  const [formData, setFormData] = useState({
    title: "",
    description: "",
  });

  const fetchProjects = async () => {

    try {

      const data = await getProjects();
      setProjects(data);

    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchProjects();
  }, []);

  const handleChange = (e) => {

    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {

    e.preventDefault();

    try {

      await createProject(formData);

      setFormData({
        title: "",
        description: "",
      });

      fetchProjects();

    } catch (error) {
      alert(error.response.data.message);
    }
  };

  const deleteHandler = async (id) => {

    try {

      await deleteProject(id);
      fetchProjects();

    } catch (error) {
      console.log(error);
    }
  };

  return (

    <Layout>

      <div className="page-header">

        <h1>Projects</h1>

        <p>
          Manage all team projects in one place.
        </p>

      </div>

      {user.role === "Admin" && (

        <div className="card">

          <h3>Create Project</h3>

          <input
            name="title"
            placeholder="Project Title"
            value={formData.title}
            onChange={handleChange}
          />

          <textarea
            name="description"
            placeholder="Project Description"
            value={formData.description}
            onChange={handleChange}
          />

          <button
            className="btn btn-primary top-space"
            onClick={handleSubmit}
          >
            Create Project
          </button>

        </div>
      )}

      <div className="grid top-space">

        {projects.map((project) => (

          <div className="card" key={project._id}>

            <h3>{project.title}</h3>

            <p className="top-space">
              {project.description}
            </p>

            {user.role === "Admin" && (

              <div className="task-actions">

                <button
  className="btn btn-danger"
  onClick={() => {
    if (
      window.confirm(
        "Do You Want To Delete This Project?"
      )
    ) {
      deleteHandler(project._id);
    }
  }}
>
  Delete
</button>

              </div>
            )}

          </div>
        ))}

      </div>

    </Layout>
  );
}


export default ProjectsPage;