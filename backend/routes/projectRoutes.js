const express = require("express");

const router = express.Router();

const {

  createProject,

  getProjects,

  deleteProject,

} = require(
  "../controllers/projectController"
);

const {

  protect,

  adminOnly,

} = require(
  "../middleware/authMiddleware"
);



// CREATE PROJECT
router.post(
  "/",
  protect,
  adminOnly,
  createProject
);



// GET PROJECTS
router.get(
  "/",
  protect,
  getProjects
);



// DELETE PROJECT
router.delete(
  "/:id",
  protect,
  adminOnly,
  deleteProject
);



module.exports = router;