import {
  useEffect,
  useState,
} from "react";

import Layout from "../components/Layout";

import {
  createTask,
  getTasks,
  updateTaskStatus,
  deleteTask,
  editTask,
} from "../services/taskService";

import {
  getProjects,
} from "../services/projectService";

import {
  getUsers,
} from "../services/userService";

function TasksPage() {

  const user =
    JSON.parse(
      localStorage.getItem("user")
    );

  const [tasks, setTasks] =
    useState([]);

  const [projects, setProjects] =
    useState([]);

  const [users, setUsers] =
    useState([]);

  const [editModal, setEditModal] =
    useState(false);

  const [editingTaskId, setEditingTaskId] =
    useState("");

  const [formData, setFormData] =
    useState({

      title: "",
      description: "",
      assignedTo: "",
      assignedDate: "",
      deadlineDate: "",
      project: "",
    });

  const [editData, setEditData] =
    useState({

      title: "",
      description: "",
      assignedTo: "",
      assignedDate: "",
      deadlineDate: "",
      project: "",
      status: "",
    });



  // FETCH TASKS
  const fetchTasks =
    async () => {

      try {

        const data =
          await getTasks();

        setTasks(data);

      } catch (error) {

        console.log(error);
      }
    };



  // FETCH PROJECTS
  const fetchProjects =
    async () => {

      try {

        const data =
          await getProjects();

        setProjects(data);

      } catch (error) {

        console.log(error);
      }
    };



  // FETCH USERS
  const fetchUsers =
    async () => {

      try {

        const data =
          await getUsers();

        setUsers(data);

      } catch (error) {

        console.log(error);
      }
    };



  useEffect(() => {

    fetchTasks();

    fetchProjects();

    fetchUsers();

  }, []);



  // HANDLE CREATE FORM
  const handleChange =
    (e) => {

      setFormData({

        ...formData,

        [e.target.name]:
          e.target.value,
      });
    };



  // CREATE TASK
  const handleSubmit =
    async (e) => {

      e.preventDefault();

      try {

        await createTask(
          formData
        );

        setFormData({

          title: "",
          description: "",
          assignedTo: "",
          assignedDate: "",
          deadlineDate: "",
          project: "",
        });

        fetchTasks();

      } catch (error) {

        alert(
          error.response.data.message
        );
      }
    };



  // UPDATE STATUS
  const statusHandler =
    async (id, status) => {

      try {

        await updateTaskStatus(
          id,
          status
        );

        fetchTasks();

      } catch (error) {

        console.log(error);
      }
    };



  // DELETE TASK
  const deleteHandler =
    async (id) => {

      const confirmDelete =
        window.confirm(
          "Delete this task?"
        );

      if (!confirmDelete)
        return;

      try {

        await deleteTask(id);

        fetchTasks();

      } catch (error) {

        console.log(error);
      }
    };



  // OPEN EDIT MODAL
  const openEditModal =
    (task) => {

      setEditingTaskId(task._id);

      setEditData({

        title:
          task.title || "",

        description:
          task.description || "",

        assignedTo:
          task.assignedTo?._id || "",

        assignedDate:
          task.assignedDate
            ? task.assignedDate
                .split("T")[0]
            : "",

        deadlineDate:
          task.deadlineDate
            ? task.deadlineDate
                .split("T")[0]
            : "",

        project:
          task.project?._id || "",

        status:
          task.status || "",
      });

      setEditModal(true);
    };



  // HANDLE EDIT FORM
  const handleEditChange =
    (e) => {

      setEditData({

        ...editData,

        [e.target.name]:
          e.target.value,
      });
    };



  // SAVE EDIT
  const saveTaskChanges =
    async () => {

      try {

        await editTask(
          editingTaskId,
          editData
        );

        setEditModal(false);

        fetchTasks();

      } catch (error) {

        console.log(error);
      }
    };



  return (

    <Layout>

      {/* PAGE HEADER */}

      <div className="page-header">

        <h1>
          Tasks
        </h1>

        <p>
          Track progress, Assignments, and Workflow.
        </p>

      </div>



      {/* CREATE TASK */}

      {user.role === "Admin" && (

        <div className="card">

          <h3>
            Create Task
          </h3>

          <input
            name="title"
            placeholder="Task Title"
            value={formData.title}
            onChange={handleChange}
          />

          <textarea
            name="description"
            placeholder="Task Description"
            value={formData.description}
            onChange={handleChange}
          />



          {/* DATE SECTION */}

          <div className="date-grid">

            <div className="date-field">

              <label>
                Assigned Date
              </label>

              <input
                type="date"
                name="assignedDate"
                value={formData.assignedDate}
                onChange={handleChange}
              />

            </div>

            <div className="date-field">

              <label>
                Deadline Date
              </label>

              <input
                type="date"
                name="deadlineDate"
                value={formData.deadlineDate}
                onChange={handleChange}
              />

            </div>

          </div>



          {/* USER SELECT */}

          <select
            className="premium-select"
            name="assignedTo"
            value={formData.assignedTo}
            onChange={handleChange}
          >

            <option value="">
              Assign User
            </option>

            {users.map((u) => (

              <option
                key={u._id}
                value={u._id}
              >
                {u.name} ({u.role})
              </option>
            ))}

          </select>



          {/* PROJECT SELECT */}

          <select
            className="premium-select"
            name="project"
            value={formData.project}
            onChange={handleChange}
          >

            <option value="">
              Select Project
            </option>

            {projects.map((p) => (

              <option
                key={p._id}
                value={p._id}
              >
                {p.title}
              </option>
            ))}

          </select>



          <button
            className="btn btn-primary top-space"
            onClick={handleSubmit}
          >
            Create Task
          </button>

        </div>
      )}



      {/* TASK LIST */}

      <div className="grid top-space">

        {tasks.map((task) => (

          <div
            className="card"
            key={task._id}
          >

            <h3>
              {task.title}
            </h3>

            <p className="top-space">
              {task.description}
            </p>



            <div className="top-space">

              <p>
                Assigned To:
                {" "}
                {task.assignedTo?.name}
              </p>

              <p>
                Project:
                {" "}
                {task.project?.title}
              </p>

              <p>
                Assigned:
                {" "}
                {task.assignedDate
                  ? new Date(
                      task.assignedDate
                    ).toLocaleDateString()
                  : "N/A"}
              </p>

              <p>
                Deadline:
                {" "}
                {task.deadlineDate
                  ? new Date(
                      task.deadlineDate
                    ).toLocaleDateString()
                  : "No Deadline"}
              </p>

            </div>



            {/* STATUS BADGE */}

            <div
              className={`badge ${
                task.status === "Completed"
                  ? "completed"
                  : task.status === "In Progress"
                  ? "progress"
                  : "pending"
              }`}
            >
              {task.status}
            </div>



            {/* TASK ACTIONS */}

            <div className="task-actions">

              <select
                className={`premium-select status-select ${
                  task.status === "Completed"
                    ? "status-completed"
                    : task.status === "In Progress"
                    ? "status-progress"
                    : "status-pending"
                }`}
                value={task.status}
                onChange={(e) =>
                  statusHandler(
                    task._id,
                    e.target.value
                  )
                }
              >

                <option value="Pending">
                  Pending
                </option>

                <option value="In Progress">
                  In Progress
                </option>

                <option value="Completed">
                  Completed
                </option>

              </select>



              {/* ADMIN ACTIONS */}

              {user.role === "Admin" && (

                <>

                  <button
                    className="btn btn-primary"
                    onClick={() =>
                      openEditModal(task)
                    }
                  >
                    Edit
                  </button>

                  <button
                    className="btn btn-danger"
                    onClick={() =>
                      deleteHandler(
                        task._id
                      )
                    }
                  >
                    Delete
                  </button>

                </>
              )}

            </div>

          </div>
        ))}

      </div>



      {/* EDIT MODAL */}

      {editModal && (

        <div className="modal-overlay">

          <div className="modal-box">

            {/* HEADER */}

            <div className="modal-header">

              <div className="modal-title-section">

                <h2>
                  Edit Task
                </h2>

                <p>
                  Update task details, assignment and workflow status.
                </p>

              </div>

              <button
                className="close-modal-btn"
                onClick={() =>
                  setEditModal(false)
                }
              >
                ✕
              </button>

            </div>



            {/* FORM */}

            <div className="modal-form-section">

              <input
                type="text"
                name="title"
                placeholder="Task Title"
                value={editData.title}
                onChange={handleEditChange}
              />

              <textarea
                name="description"
                placeholder="Description"
                value={editData.description}
                onChange={handleEditChange}
              />



              {/* DATES */}

              <div className="date-grid">

                <div className="date-field">

                  <label>
                    Assigned Date
                  </label>

                  <input
                    type="date"
                    name="assignedDate"
                    value={editData.assignedDate}
                    onChange={handleEditChange}
                  />

                </div>

                <div className="date-field">

                  <label>
                    Deadline Date
                  </label>

                  <input
                    type="date"
                    name="deadlineDate"
                    value={editData.deadlineDate}
                    onChange={handleEditChange}
                  />

                </div>

              </div>



              {/* USER */}

              <select
                className="premium-select"
                name="assignedTo"
                value={editData.assignedTo}
                onChange={handleEditChange}
              >

                <option value="">
                  Assign User
                </option>

                {users.map((u) => (

                  <option
                    key={u._id}
                    value={u._id}
                  >
                    {u.name}
                  </option>
                ))}

              </select>



              {/* PROJECT */}

              <select
                className="premium-select"
                name="project"
                value={editData.project}
                onChange={handleEditChange}
              >

                <option value="">
                  Select Project
                </option>

                {projects.map((p) => (

                  <option
                    key={p._id}
                    value={p._id}
                  >
                    {p.title}
                  </option>
                ))}

              </select>



              {/* STATUS */}

              <select
                className="premium-select"
                name="status"
                value={editData.status}
                onChange={handleEditChange}
              >

                <option value="Pending">
                  Pending
                </option>

                <option value="In Progress">
                  In Progress
                </option>

                <option value="Completed">
                  Completed
                </option>

              </select>

            </div>



            {/* ACTIONS */}

            <div className="modal-actions">

              <button
                className="btn btn-danger"
                onClick={() =>
                  setEditModal(false)
                }
              >
                Back
              </button>

              <button
                className="btn btn-primary"
                onClick={saveTaskChanges}
              >
                Save Changes
              </button>

            </div>

          </div>

        </div>
      )}

    </Layout>
  );
}

export default TasksPage;