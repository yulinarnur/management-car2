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

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

const sessionStore = SequelizeStore(session.Store);

const store = new sessionStore({
  db: db,
});

// (async () => {
//   await db.sync();
// })();

app.use(
  session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: true,
    store: store,
    cookie: {
      secure: "auto",
    },
  })
);
app.use(
  cors({
    credentials: true,
    origin: "http://localhost:3000",
  })
);

app.use(express.json());
app.use(UserRoute);
app.use(CarRoute);
app.use(AuthRoute);

app.use("/public", express.static("public"));
// store.sync();

app.listen(process.env.APP_PORT, () => {
  console.log("Server up and running");
});
