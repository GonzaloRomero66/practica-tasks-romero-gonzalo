import { body, param } from "express-validator"
import { ProfeModel } from "../../models/Profesores.js";
import { UserModel } from "../../models/User.js";

export const validationId = [
    param("id")
        .isInt({min: 1})
        .withMessage("El ID debe ser un numero entero positivo")
        .custom(async (id) => {
            const profesor = await ProfeModel.findByPk(id);
            if (!profesor){
                throw new Error("El profesor no existe")
            }
            return true;
        })
]

export const CrearProfevalidations = [
    body("name")
        .notEmpty()
        .withMessage("El nombre no puede estar vacio")
        .isLength({max: 20})
        .withMessage("El nombre no tiene que ser mayor a 20 caracteres")
        .isLength({min: 5})
        .withMessage("El nombre tiene que ser de minimo 5 caracteres")
        .isString()
        .withMessage("El nombre tiene que ser de tipo string")
        .custom(async (name) => {
            const profesor = await ProfeModel.findOne({
                where: {name}
            })
            if (profesor){
                throw new Error("El nombre ya existe")
            }
            return true
        })
        ,
    body("email")
        .notEmpty()
        .withMessage("El email no puede estar vacio")
        .isString()
        .withMessage("El email tiene que ser de tipo string")
        .isEmail()
        .withMessage("El email tiene que ser un tipo de email valido")
        .isLength({max: 50})
        .withMessage("El email tiene que ser menor a 50 caracteres")
        ,
    body("password")
        .notEmpty()
        .withMessage("La contraseña no puede estar vacio")
        .isString()
        .withMessage("La contraseña debe de ser de tipo string")
        .isLength({min: 8})
        .withMessage("La contraseña debe de ser minimo de 8 caracteres")
        ,

    body("speciality")
    .notEmpty()
    .withMessage("La especialidad no deberia de estar vacio")
    .isString()
    .withMessage("La especialidad deberia de ser de tipo caracter")
    .isLength({max: 50})
    .withMessage("La especialidad debe de ser menor a 50 caracteres"),

    body("UserId")
    .isInt({min: 1})
    .withMessage("Tiene que ser de al menos un digito y entero")
    .notEmpty()
    .withMessage("El id del usuario no tiene que estar vacio")
    .custom(async (id) => {
        const usuario = await UserModel.findByPk(id)
        if(!usuario) {
            throw new Error("El usuario no existe")
        }
        return true
    })
];

export const validationUpdate = [
        body("name")
        .optional()
        .isLength({max: 20})
        .withMessage("El nombre no tiene que ser mayor a 20 caracteres")
        .isLength({min: 5})
        .withMessage("El nombre tiene que ser de minimo 5 caracteres")
        .isString()
        .withMessage("El nombre tiene que ser de tipo string")
        ,
    body("email")
        .optional()
        .isString()
        .withMessage("El email tiene que ser de tipo string")
        .isEmail()
        .withMessage("El email tiene que ser un tipo de email valido")
        .isLength({max: 50})
        .withMessage("El email tiene que ser menor a 50 caracteres")
        ,
    body("password")
        .optional()
        .isString()
        .withMessage("La contraseña debe de ser de tipo string")
        .isLength({min: 8})
        .withMessage("La contraseña debe de ser minimo de 8 caracteres")
        ,
    body("speciality")
        .optional()
        .isString()
        .withMessage("La especialidad debe de ser de tipo string")
        .isLength({max: 50})
        .withMessage("La especialidad debe de ser menor a 50 caracteres")
        ,
    body("UserId")
    .optional()
    .isInt({min: 1})
    .withMessage("Tiene que ser al menos de un digito y un numero entero")
    .custom(async (id) => {
        const usuario = await UserModel.findByPk(id)
        if(!usuario){
            throw new Error("El usuario no existe")
        }
        return true
    })
];
