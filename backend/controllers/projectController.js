const Project =
  require("../models/Project");

const createProject =
  async (req, res) => {

    try {

      const {

        title,

        description,

      } = req.body;

      if (!title) {

        return res.status(400).json({

          message:
            "Project title required",
        });
      }

      const project =
        await Project.create({

          title,

          description,

          createdBy:
            req.user._id,
        });

      res.status(201).json(
        project
      );

    } catch (error) {

      res.status(500).json({

        message:
          error.message,
      });
    }
  };


const getProjects =
  async (req, res) => {

    try {

      const projects =
        await Project.find()

        .populate(
          "createdBy",
          "name email"
        );

      res.status(200).json(
        projects
      );

    } catch (error) {

      res.status(500).json({

        message:
          error.message,
      });
    }
  };


const deleteProject =
  async (req, res) => {

    try {

      const project =
        await Project.findById(
          req.params.id
        );

      if (!project) {

        return res.status(404).json({

          message:
            "Project not found",
        });
      }

      await project.deleteOne();

      res.status(200).json({

        message:
          "Project deleted successfully",
      });

    } catch (error) {

      res.status(500).json({

        message:
          error.message,
      });
    }
  };



module.exports = {

  createProject,

  getProjects,

  deleteProject,
};