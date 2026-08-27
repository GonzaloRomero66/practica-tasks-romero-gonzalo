import { body, param } from "express-validator";
import { ProfeModel } from "../../models/Profesores.js";
import { MateriaModel } from "../../models/Materias.js";

export const validationId = [
    param("id")
    .isInt({min: 1})
    .withMessage("El id del profesor debe de ser un numero entero")
    .custom(async (id) => {
        const profesor = await ProfeModel.findByPk(id)
        if (!profesor){
            throw new Error("El profesor no existe")
        }
        return true
    })
]
export const CrearMatevalidations = [
    body("name")
        .notEmpty()
        .withMessage("El nombre no puede estar vacio")
        .isString()
        .withMessage("El nombre debe de ser tipo string")
        .isLength({max: 20})
        .withMessage("El nombre no tiene que tener mas de 20 caracteres")
        .custom(async (name) => {
            const materia = await MateriaModel.findOne({
                where: {name}
            })
            if (materia){
                throw new Error("La materia ya existe")
            }
            return true
        })
        ,
    body("description")
        .notEmpty()
        .withMessage("La descripcion no puede estar vacia")
        .isString()
        .withMessage("La descripcion debe de ser de tipo string")
        .isLength({max: 50})
        .withMessage("La descripcion no tiene que ser mas de 50 caracteres")
        ,
    body("ProfeId")
        .notEmpty()
        .withMessage("El ID del profesor no puede estar vacio")
        .isInt({min: 1})
        .withMessage("El ID del profesor tiene que ser de un digito y ser un numero entero")
        .custom(async (id) => {
            const profesor = await ProfeModel.findByPk(id)
            if(!profesor){
                throw new Error("El profesor no existe")
            }
            return true
        })
]
export const validationUpdate = [
    body("name")
        .optional()
        .isString()
        .withMessage("El nombre debe de ser de tipo string")
        .isLength({max: 20})
        .withMessage("El nombre no debe de ser mas de 20 caracteres")
        .custom(async (name, req) => {
            const materia = await MateriaModel.findOne({
                where: {name}
            })
            if(materia && materia.id != req.params.id){
                throw new Error("La materia ya existe")
            }
            return true
        })
        ,
    body("description")
        .optional()
        .isString()
        .withMessage("La descripcion debe de ser de tipo string")
        .isLength({max: 50})
        .withMessage("La descripcion no debe de ser mas de 50 caracteres")
        ,
    body("ProfeId")
        .optional()
        .isInt({min: 1})
        .withMessage("El ID del profesor debe de ser de un digito y un numero entero")
        .custom(async (id) => {
            const profesor = await ProfeModel.findByPk(id)
            if(!profesor){
                throw new Error("El profesor no existe")
            }
            return true
        })
]