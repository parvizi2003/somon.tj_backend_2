import mongoose from "mongoose";
import bcrypt from "bcrypt";

import AdminModel from "../models/Admin.js";
import UserModel from "../models/User.js";
import CityModel from "../models/City.js";
import PostModel from "../models/Post.js";

import posts from "./somonPosts.json" assert { type: "json" };
import cities from "./somonCities.json" assert { type: "json" };

mongoose
  .connect("mongodb://localhost:27017/somon")
  .then(() => console.log("DB ok"))
  .catch((err) => console.log(err));

const salt = await bcrypt.genSalt(10);
const hash = await bcrypt.hash("12345", salt);

const admin = new AdminModel({
  name: "admin",
  passwordHash: hash,
});
await admin.save();

const user = new UserModel({
  name: "parviz",
  phone: 928283352,
  passwordHash: hash,
});
const userId = user._id;
await user.save();

let cityId;

cities.forEach(async (data) => {
  const city = new CityModel(data);
  if (!cityId) {
    cityId = city._id;
  }
  await city.save();
});

posts.forEach(async (data) => {
  data.user = userId;
  data.city = cityId;
  const post = new PostModel(data);
  await post.save();
});
posts.forEach(async (data) => {
  data.user = userId;
  data.city = cityId;
  data.isModerated = true;
  const post = new PostModel(data);
  await post.save();
});
console.log("Done");
