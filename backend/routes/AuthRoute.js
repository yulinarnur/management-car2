import express from "express";
// import methodOverride from "method-override";
import { Login, logOut, Me } from "../controllers/Auth.js";
import session from "express-session";

const router = express.Router();

router.use(
  session({
    secret: "secret",
    resave: false,
    saveUninitialized: true,
  })
);

// route render ke login page
router.get("/", (req, res) => {
  res.render("index", { title: "Login" });
});

router.post("/logout", logOut);

//router API endpoint
router.get("/me", Me);
router.post("/login", Login);
// router.delete("/logout", logOut);

export default router;
