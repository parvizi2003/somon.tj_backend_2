import jwt from "jsonwebtoken";
import AdminModel from "../models/Admin.js";

export default async (req, res, next) => {
  console.log(req.headers);
  const token = (req.headers.authorization || "").replace(/Bearer\s?/, "");
  if (token) {
    try {
      const decoded = jwt.verify(token, "secret123");
      const admin = await AdminModel.findOne({ _id: decoded._id });
      if (!admin) {
        res.status(403).json({
          message: "Нет доступа",
        });
      }
      req.adminId = decoded._id;
      next();
    } catch (err) {
      res.status(403).json({
        message: "Нет доступа",
      });
    }
  } else {
    return res.status(403).json({
      message: "Нет доступа",
    });
  }
};
