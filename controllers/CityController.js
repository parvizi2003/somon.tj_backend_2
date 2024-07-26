import CityModel from "../models/City.js";

export const getCities = async (req, res) => {
  try {
    const cities = await CityModel.find();
    if (!cities) {
      return res.status(404).json({ message: "Города не найдены" });
    }
    res.json(cities);
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Не удалось получить города" });
  }
};
