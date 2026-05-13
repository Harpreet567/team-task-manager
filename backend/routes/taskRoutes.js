const express = require("express");

const router = express.Router();

const {

  createTask,

  getTasks,

  updateTask,

  deleteTask,

  getDashboardStats,

} = require(
  "../controllers/taskController"
);

const {

  protect,

  adminOnly,

} = require(
  "../middleware/authMiddleware"
);



// CREATE TASK
router.post(
  "/",
  protect,
  adminOnly,
  createTask
);


router.get(
  "/",
  protect,
  getTasks // both admin and member can see tasks (admin sees all tasks but member sees only own tasks)
);

router.get(
  "/stats",
  protect,
  getDashboardStats // both admin and member can see dashboard stats
);


router.put(
  "/:id",
  protect,
  updateTask // both admin and member can update task status
);

router.delete(
  "/:id",
  protect,
  adminOnly, 
  deleteTask // only admin can delete tasks
);



module.exports = router;