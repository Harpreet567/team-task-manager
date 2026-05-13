const Task = require("../models/Task");


const createTask =
  async (req, res) => {

    try {

      const {

        title,
        description,
        assignedTo,
        assignedDate,
        deadlineDate,
        project,

      } = req.body;

      if (!title) {

        return res.status(400).json({

          message:
            "Task title required",
        });
      }

      const task =
        await Task.create({

          title,
          description,
          assignedTo,
          assignedDate,
          deadlineDate,
          project,
        });

      res.status(201).json(task);

    } catch (error) {

      res.status(500).json({

        message:
          error.message,
      });
    }
  };


const getTasks =
  async (req, res) => {

    try {

      let tasks;

       if (req.user.role === "Admin") {

        tasks =
          await Task.find()

          .populate(
            "assignedTo",
            "name email role"
          )

          .populate(
            "project",
            "title"
          );
      }

      else {

        tasks =
          await Task.find({

            assignedTo:
              req.user._id,
          })

          .populate(
            "assignedTo",
            "name email role"
          )

          .populate(
            "project",
            "title"
          );
      }

      res.status(200).json(tasks);

    } catch (error) {

      res.status(500).json({

        message:
          error.message,
      });
    }
  };




const updateTask =
  async (req, res) => {

    try {

      const task =
        await Task.findById(
          req.params.id
        );

      if (!task) {

        return res.status(404).json({

          message:
            "Task not found",
        });
      }


      if (

        req.user.role === "Member"

        &&

        task.assignedTo.toString() !==
          req.user._id.toString()
      ) {

        return res.status(403).json({

          message:
            "Not authorized to update this task",
        });
      }

      // ADMIN CAN EDIT FULL TASK
if (req.user.role === "Admin") {

  task.title =
    req.body.title ||
    task.title;

  task.description =
    req.body.description ||
    task.description;

  task.assignedTo =
    req.body.assignedTo ||
    task.assignedTo;

  task.assignedDate =
    req.body.assignedDate ||
    task.assignedDate;

  task.deadlineDate =
    req.body.deadlineDate ||
    task.deadlineDate;

  task.project =
    req.body.project ||
    task.project;

  task.status =
    req.body.status ||
    task.status;
}

// MEMBER CAN ONLY UPDATE STATUS
else {

  task.status =
    req.body.status ||
    task.status;
}

      const updatedTask =
        await task.save();

      res.status(200).json(
        updatedTask
      );

    } catch (error) {

      res.status(500).json({

        message:
          error.message,
      });
    }
  };


const deleteTask =
  async (req, res) => {

    try {

      const task =
        await Task.findById(
          req.params.id
        );

      if (!task) {

        return res.status(404).json({

          message:
            "Task not found",
        });
      }

      await task.deleteOne();

      res.status(200).json({

        message:
          "Task deleted successfully",
      });

    } catch (error) {

      res.status(500).json({

        message:
          error.message,
      });
    }
  };



const getDashboardStats =
  async (req, res) => {

    try {

      let tasks;

      //admin can see all the tasks but member can only see their own tasks
      if (req.user.role === "Admin") {

        tasks =
          await Task.find();
      }

      else {

        tasks =
          await Task.find({

            assignedTo:
              req.user._id,
          });
      }

      const totalTasks =
        tasks.length;

      const completedTasks =
        tasks.filter(
          (task) =>
            task.status ===
            "Completed"
        ).length;

      const overdueTasks =
        tasks.filter((task) => {

          return (

            task.status !==
              "Completed"

            &&

            task.deadlineDate

            &&

            new Date(
              task.deadlineDate
            ) < new Date()
          );
        }).length;

      res.json({

        totalTasks,
        completedTasks,
        overdueTasks,
      });

    } catch (error) {

      res.status(500).json({

        message:
          error.message,
      });
    }
  };



module.exports = {

  createTask,

  getTasks,

  updateTask,

  deleteTask,

  getDashboardStats,
};