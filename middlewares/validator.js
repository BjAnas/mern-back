const { check, validationResult } = require("express-validator");

exports.registerValidation = () => [
    check("name", "The name field should not be empty").notEmpty(),
    check("email", "The email field should not be empty").notEmpty(),
    check("email", "Invalid email format").isEmail(),
    check("password", "The password should be at least 6 characters long").isLength({min: 6})
];

exports.validator = (req, res, next) => {
    const errors = validationResult(req);
    if (errors.isEmpty()) {
        next();
    } else {
        res.status(400).send(errors.array());
    }
};
