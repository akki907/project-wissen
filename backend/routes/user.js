const express = require("express");
const router = express.Router();
const {
  authUser,
  registerUser,
  getUsers,
  deleteUser,
  getUserById,
  createUser,
} = require("./../controllers/user");
const { protect, admin } = require("../middleware/index");

router.route("/").post(createUser).get(protect, admin, getUsers);
router.route("/register").post(registerUser);
router.post("/login", authUser);

router
  .route("/:id")
  .delete(protect, admin, deleteUser)
  .get(protect, admin, getUserById)

module.exports = router;
