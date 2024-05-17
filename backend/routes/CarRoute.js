import express from "express";
import multer from "multer";
import {
  getCars,
  getCarById,
  createCar,
  updateCar,
  deleteCar,
} from "../controllers/Cars.js";
import { verifyUser } from "../middleware/AuthUser.js";
import { Cars } from "../models/CarModel.js";

const router = express.Router();
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "./public/uploads");
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname);
  },
});
const upload = multer({ storage: storage });

router.get("/cars", verifyUser, async (req, res) => {
  try {
    const cars = await Cars.findAll();
    res.render("car_dashboard", {
      title: "Car Dashboard",
      currentUser: req.user,
      cars: cars,
    });
  } catch (error) {
    console.error(error);
    res.status(500).send("Internal Server Error");
  }
});

router.get("/cars/add", verifyUser, (req, res) => {
  res.render("add_car", {
    title: "Add New Car",
    currentUser: req.user,
  });
});

router.get("/cars/edit/:id", verifyUser, async (req, res) => {
  try {
    const car = await Cars.findOne({
      where: {
        uuid: req.params.id,
      },
    });
    if (!car) return res.status(404).json({ msg: "Data tidak ditemukan" });

    res.render("edit_car", {
      title: "Edit Car",
      car: car,
      currentUser: req.user,
    });
  } catch (error) {
    res.status(500).json({ msg: error.message });
  }
});

// delete
router.get("/delete/:id", deleteCar);

// endpoint
router.get("/cars", verifyUser, getCars);
router.get("/cars/:id", verifyUser, getCarById);
router.post("/cars", verifyUser, upload.single("images"), createCar);
router.post("/cars/:id", verifyUser, upload.single("images"), updateCar);
router.delete("/cars/:id", verifyUser, deleteCar);

export default router;
