import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";

import UserModel from "../models/User.js";

export const register = async (req, res) => {
  try {
    const salt = await bcrypt.genSalt(10);
    const hash = await bcrypt.hash(req.body.password, salt);

    const doc = new UserModel({
      name: req.body.name,
      phone: req.body.phone,
      passwordHash: hash,
    });

    const user = await doc.save();

    const token = jwt.sign({ _id: user._id }, "secret123", {
      expiresIn: "30d",
    });

    const { passwordHash, ...userData } = user._doc;

    res.json({
      userData,
      token,
    });
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Не удалось зарегистрироваться" });
  }
};

export const login = async (req, res) => {
  try {
    const user = await UserModel.findOne({ name: req.body.name });

    if (!user) {
      return res.status(404).json({ message: "Пользователь не найден" });
    }

    const isValidPassword = await bcrypt.compare(
      req.body.password,
      user._doc.passwordHash
    );

    if (!isValidPassword) {
      return res.status(400).json({ message: "Неверный логин или пароль" });
    }
    const token = jwt.sign({ _id: user._id }, "secret123", {
      expiresIn: "30d",
    });
    const { passwordHash, ...userData } = user._doc;

    res.json({
      userData,
      token,
    });
  } catch (err) {
    console.log(err);
    res.status(500).json("Не удалось авторизоваться");
  }
};

export const getMe = async (req, res) => {
  try {
    const user = await UserModel.findOne({ _id: req.userId });

    if (!user) {
      return res.status(403).json({ message: "Пользователь не найден" });
    }

    const { passwordHash, ...userData } = user._doc;
    res.json(userData);
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Нет доступа" });
  }
};

export const remove = async (req, res) => {
  try {
    const user = await UserModel.findOneAndDelete({ _id: req.userId });

    if (!user) {
      return res.status(404).json({ message: "Пользователь не найден" });
    }

    res.json({ message: "Пользователь успешно удален" });
  } catch (err) {
    console.log(err);
    res.status(500).json("Не удалось удалить аккаунт");
  }
};
