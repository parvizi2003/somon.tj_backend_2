import express from "express";
import multer from "multer";
import mongoose from "mongoose";
import cors from "cors";

import {
  registerValidation,
  loginValidation,
  createPostValidation,
} from "./validations.js";
import {
  checkAuth,
  handleValidationErrors,
  defineUser,
} from "./utils/index.js";
import {
  UserController,
  PostController,
  CityController,
} from "./controllers/index.js";
import { getUserPosts } from "./controllers/PostController.js";
import adminRoutes from "./adminRoutes.js";

mongoose
  .connect("mongodb://localhost:27017/somon")
  .then(() => console.log("DB ok"))
  .catch((err) => console.log(err));

const app = express();

const storage = multer.diskStorage({
  destination: (_, __, cb) => {
    cb(null, "uploads");
  },
  filename: (_, file, cb) => {
    cb(null, file.originalname);
  },
});

const upload = multer({ storage });

app.use(express.json());
app.use(cors());
app.use("/uploads", express.static("uploads"));
app.use("/admin/", adminRoutes);

app.post(
  "/auth/register",
  registerValidation,
  handleValidationErrors,
  UserController.register
);
app.post(
  "/auth/login",
  loginValidation,
  handleValidationErrors,
  UserController.login
);
app.get("/auth/me", checkAuth, UserController.getMe);
app.delete("/auth/delete", checkAuth, UserController.remove);

app.post("/upload", checkAuth, upload.single("image"), (req, res) => {
  res.json({
    url: `/uploads/${req.file.originalname}`,
  });
});

app.post(
  "/add-post",
  checkAuth,
  createPostValidation,
  handleValidationErrors,
  PostController.create
);
app.get("/posts", PostController.getAll);
app.get("/posts/:id", defineUser, PostController.getOne);
app.get("/postsCount", PostController.getCount);
app.get("/userPosts", checkAuth, getUserPosts);

app.delete("/posts/:id", checkAuth, PostController.remove);
app.patch(
  "/posts/:id",
  checkAuth,
  handleValidationErrors,
  createPostValidation,
  PostController.update
);

app.get("/cities", CityController.getCities);

app.get("/:category", PostController.getByCategory);

app.listen(4444, (err) => {
  if (err) {
    return console.log(err);
  }
  console.log("Server started on port: 4444");
});
