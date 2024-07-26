import express from "express";
import { getAll, login, register } from "./controllers/AdminController.js";
import { loginValidation } from "./validations.js";
import adminCheckAuth from "./utils/adminCheckAuth.js";

const router = express.Router();

router.get("/posts", adminCheckAuth, getAll);

router.post("/login", loginValidation, login);
router.post("/register", adminCheckAuth, register);

export default router;
