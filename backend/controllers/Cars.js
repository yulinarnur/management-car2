import { response } from "express";
import Cars from "../models/CarModel.js";
import Users from "../models/UserModel.js";
import { Op } from "sequelize";
import path from "path";
import fs from "fs";

const saveImg = (image) => {
  if (!image || !image.name || !image.data) {
    throw new Error("Invalid image object");
  }

  const imgPath = path.join(__dirname, "../public/uploads", image.name);
  fs.writeFileSync(imgPath, image.data);
  return `../public/uploads/${image.name}`;
};

export const getCars = async (req, res) => {
  try {
    let response;
    if (req.role === "admin") {
      response = await Cars.findAll({
        attributes: [
          "id",
          "uuid",
          "model",
          "rentPerDay",
          "images",
          "createdAt",
          "updatedAt",
        ],
        include: [
          {
            model: Users,
            attributes: [
              "id",
              "uuid",
              "name",
              "email",
              "role",
              "createdAt",
              "updatedAt",
            ],
          },
        ],
      });
    } else {
      response = await Cars.findAll({
        where: {
          userId: req.userId,
        },
        include: [
          {
            model: Users,
          },
        ],
      });
    }
    res.status(200).json(response);
  } catch (error) {
    res.status(500).json({ msg: error.message });
  }
};

export const getCarById = async (req, res) => {
  try {
    const car = await Cars.findOne({
      where: {
        uuid: req.params.id,
      },
    });

    if (!car) return res.status(404).json({ msg: "Data tidak ditemukan" });
    let response;
    if (req.role === "admin") {
      response = await Cars.findOne({
        where: {
          id: car.id,
        },
        include: [
          {
            model: Users,
          },
        ],
      });
    } else {
      response = await Cars.findOne({
        where: {
          [Op.and]: [{ id: car.id }, { userId: req.userId }],
        },
        include: [
          {
            model: Users,
          },
        ],
      });
    }
    res.status(200).json(response);
  } catch (error) {
    res.status(500).json({ msg: error.message });
  }
};

export const createCar = async (req, res) => {
  const { model, rentPerDay, images } = req.body;
  try {
    await Cars.create({
      model: model,
      rentPerDay: rentPerDay,
      images: req.file.path,
      userId: req.userId,
    });
    res.status(201).json({ msg: "Car Created Successfuly" });
  } catch (error) {
    res.status(500).json({ msg: error.message });
    console.log("apaaa yaa", error);
  }
};

export const updateCar = (req, res) => {};

export const deleteCar = (req, res) => {};
