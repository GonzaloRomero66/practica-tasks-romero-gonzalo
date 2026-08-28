import { body, param } from "express-validator"
import { TaskModel } from "../../models/Task.js";
import { MateriaModel } from "../../models/Materias.js";
import { UserModel } from "../../models/User.js";

export const validationId = [
    param("id")
        .isInt({min: 1})
        .withMessage("El ID debe ser un numero entero positivo")
        .custom(async (id) => {
            const tarea = await TaskModel.findByPk(id);
            if (!tarea){
                throw new Error("La tarea no existe")
            }
            return true;
        })
]

export const CrearTaskvalidations = [
    body("title")
        .notEmpty()
        .withMessage("El titulo no puede estar vacio")
        .isLength({max: 50})
        .withMessage("El titulo no tiene que ser mayor a 50 caracteres")
        .isLength({min: 5})
        .withMessage("El titulo tiene que ser de minimo 5 caracteres")
        .isString()
        .withMessage("El titulo tiene que ser de tipo string")
        .custom(async (title) => {
            const tarea = await TaskModel.findOne({
                where: {title}
            })
            if (tarea){
                throw new Error("El titulo ya existe")
            }
            return true
        })
        ,
    body("description")
        .notEmpty()
        .withMessage("La descripcion no puede estar vacio")
        .isString()
        .withMessage("La descripcion tiene que ser de tipo string")
        .isLength({max: 100})
        .withMessage("La descripcion tiene que ser menor a 100 caracteres")
        ,
    body("isComplete")
        .notEmpty()
        .withMessage("El proceso no puede estar vacio")
        .isBoolean()
        .withMessage("El proceso debe de ser de tipo booleano"),

    body("UserId")
        .notEmpty()
        .withMessage("El id del usuario no puede estar vacio")
        .isInt()
        .withMessage("El id del usuario tiene que ser un numero entero")
        .isLength({min: 1})
        .withMessage("El id del usuario tiene que minimo de 1 digito")
        .custom(async (id) => {
            const usuario = await UserModel.findByPk(id)
            if (!usuario){
                throw new Error("El usuario no existe")
            }
            return true
        })
        ,

    body("MateriaId")
        .notEmpty()
        .withMessage("El id de la materia no puede estar vacio")
        .isInt()
        .withMessage("El id de la materia tiene que ser un numero entero")
        .isLength({min: 1})
        .withMessage("El id de la materia tiene que minimo de 1 digito")
        .custom(async (id) =>{
            const materia = await MateriaModel.findByPk(id)
            if (!materia){
                throw new Error("La materia no existe")
            }
            return true
        })
];


export const validationUpdate = [
        body("title")
        .optional()
        .isLength({max: 50})
        .withMessage("El titulo no tiene que ser mayor a 50 caracteres")
        .isLength({min: 5})
        .withMessage("El titulo tiene que ser de minimo 5 caracteres")
        .isString()
        .withMessage("El titulo tiene que ser de tipo string")
        ,
    body("description")
        .optional()
        .isString()
        .withMessage("La descripcion tiene que ser de tipo string")
        .isLength({max: 100})
        .withMessage("La descripcion tiene que ser menor a 100 caracteres")
        ,
    body("isComplete")
        .optional()
        .isBoolean()
        .withMessage("El proceso debe de ser de tipo booleano"),

    body("UserId")
        .optional()
        .isInt({min: 1})
        .withMessage("El id del usuario tiene que tener minimo un digito y ser numero entero")
        .custom(async (id) => {
            const usuario = await UserModel.findByPk(id)
            if (!usuario){
                throw new Error("El usuario no existe")
            }
            return true
        })
        ,

    body("MateriaId")
        .optional()
        .isInt({min: 1})
        .withMessage("El id de la materia tiene que minimo de 1 digito y ser un numero entero")
        .custom(async (id) =>{
            const materia = await MateriaModel.findByPk(id)
            if (!materia){
                throw new Error("La materia no existe")
            }
            return true
        })
];
