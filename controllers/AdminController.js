import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";

import AdminModel from "../models/Admin.js";
import PostModel from "../models/Post.js";

export const login = async (req, res) => {
  const admin = await AdminModel.findOne({ name: req.body.name });

  if (!admin) {
    return res.status(404).json({ message: "Пользователь не найден" });
  }

  const isValidPassword = await bcrypt.compare(
    req.body.password,
    admin._doc.passwordHash
  );

  if (!isValidPassword) {
    return res.status(400).json({ message: "Неверный логин или пароль" });
  }

  const token = jwt.sign({ _id: admin._id }, "secret123", { expiresIn: "30d" });

  const { passwordHash, ...adminData } = admin._doc;
  res.json({
    adminData,
    token,
  });
};
export const register = async (req, res) => {
  try {
    const salt = await bcrypt.genSalt(10);
    const hash = await bcrypt.hash(req.body.password, salt);

    const doc = new AdminModel({
      name: req.body.name,
      passwordHash: hash,
    });

    const admin = await doc.save();

    res.json({ message: "Новый админ успешно добавлен" });
  } catch (err) {
    console.log(err);
    res
      .status(500)
      .json({ message: "Не удалось зарегистрировать нового админа" });
  }
};

export const getAll = async (req, res) => {
  try {
    const posts = await PostModel.find({ isModerated: false });

    if (!posts) {
      return res.status(404).json({ message: "Статьи не найдены" });
    }

    res.json(posts);
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Не удалось получить статьи" });
  }
};
export const remove = async (req, res) => {
  try {
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Не удалось удалить статю" });
  }
};
