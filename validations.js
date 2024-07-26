import { body } from "express-validator";

export const registerValidation = [
  body("name", "Введите имя").isLength({ min: 1 }),
  body("phone", "Введите номер телефона").isLength({ min: 9, max: 9 }),
  body("password", "Введите пароль").isLength({ min: 1 }),
];

export const loginValidation = [
  body("name", "Пользователь не найден").isLength({ min: 1 }),
  body("password", "Неправильный пароль").isLength({ min: 1 }),
];

export const createPostValidation = [
  body("title", "Введите заголовок товара").isLength({ min: 3 }).isString(),
  body("description", "Введите текст товара").isString().optional(),
  body("price", "Введите цену товара").optional().isNumeric(),
  body("city", "Выберите город").isString(),
  body("images", "Вставте картинку").optional().isArray(),
  body("features", "Выберите характеристики").optional().isArray(),
  body("bargain", "Укажите возможность торга").isBoolean(),
];
