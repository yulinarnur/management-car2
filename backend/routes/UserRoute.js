import express from "express";
import {
  getUsers,
  getUserById,
  createUser,
  updateUser,
  deleteUser,
} from "../controllers/Users.js";
import { verifyUser, adminOnly } from "../middleware/AuthUser.js";
import { Users } from "../models/UserModel.js";

const router = express.Router();

// router.get("/dashboard", verifyUser, adminOnly, (req, res) => {
//   res.render("dashboard", { title: "Dashboard" });
// });

router.get("/dashboard", verifyUser, adminOnly, (req, res, next) => {
  Users.findAll()
    .then((users) => {
      if (users.length > 0) {
        res.render("dashboard", {
          title: "Dashboard User",
          users: users,
          message: null,
          currentUser: req.user, // Mengirim informasi pengguna yang sedang login
        });
      } else {
        res.render("dashboard", {
          title: "Dashboard User",
          users: null,
          message: {
            type: "warning",
            text: "No users found in the database.",
          },
          currentUser: req.user, // Mengirim informasi pengguna yang sedang login
        });
      }
    })
    .catch(next);
});

router.get("/users", verifyUser, adminOnly, getUsers);
router.get("/users/:id", verifyUser, adminOnly, getUserById);
router.post("/users", verifyUser, adminOnly, createUser);
router.patch("/users/:id", verifyUser, adminOnly, updateUser);
router.delete("/users/:id", verifyUser, adminOnly, deleteUser);

export default router;
