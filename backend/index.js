import express from "express";
import cors from "cors";
import session from "express-session";
import dotenv from "dotenv";
import db from "./config/database.js";
import SequelizeStore from "connect-session-sequelize";
import bodyParser from "body-parser";
import UserRoute from "./routes/UserRoute.js";
import CarRoute from "./routes/CarRoute.js";
import AuthRoute from "./routes/AuthRoute.js";
dotenv.config();

const app = express();

// Middleware untuk parsing body
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Middleware untuk sesi
const sessionStore = SequelizeStore(session.Store);
const store = new sessionStore({ db });

app.use(
  session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: true,
    store: store,
    cookie: { secure: "auto" },
  })
);

// Middleware untuk CORS
app.use(
  cors({
    credentials: true,
    origin: "http://localhost:3000",
  })
);

// Middleware untuk serving static files
app.use("/public", express.static("public"));

// Set template engine
app.set("view engine", "ejs");

// Mendaftarkan rute
app.use(UserRoute);
app.use(CarRoute);
app.use(AuthRoute);

app.use((req, res, next) => {
  console.log("Request Body:", req.body);
  next();
});

// Start server
app.listen(process.env.APP_PORT, () => {
  console.log("Server up and running");
});
