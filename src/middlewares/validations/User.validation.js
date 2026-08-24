import { body, validationResult } from "express-validator"

export const validations = [
    body("name")
        .notEmpty()
        .withMessage("El nombre no puede estar vacio")
        .isLength({max: 20})
        .withMessage("El nombre no tiene que ser mayor a 20 caracteres")
        .isLength({min: 5})
        .withMessage("El nombre tiene que ser de minimo 5 caracteres")
        .isString()
        .withMessage("El nombre tiene que ser de tipo string")
        ,
    body("email")
        .notEmpty()
        .withMessage("El email no puede estar vacio")
        .isString()
        .withMessage("El email tiene que ser de tipo string")
        .isEmail()
        .withMessage("El email tiene que ser un tipo de email valido")
        .isLength({max: 20})
        .withMessage("El email tiene que ser menor a 20 caracteres")
        ,
    body("password")
        .notEmpty()
        .withMessage("La contraseña no puede estar vacio")
        .isString()
        .withMessage("La contraseña debe de ser de tipo string")
        .isLength({min: 8})
        .withMessage("La contraseña debe de ser minimo de 8 caracteres")
];

export const validate = (req, res, next) => {
    const errors = validationResult(req)
    if (!errors.isEmpty()){
        return res.status(400).json({
            errors: errors.array()
        })
    }
    next()
}