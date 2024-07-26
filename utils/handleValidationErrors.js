import { validationResult } from "express-validator";

export default (req, res, next) => {
    const errors = validationResult(req);

    if (!errors) {
        console.log(errors);
        return res.status(400).json({ message: 'Не удалось создать статью'});
    };

    next();
}