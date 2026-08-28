import express from "express";
import {
    obtenerTodosLosProfesores,
    ObtenerProfesorPorId,
    crearProfesor,
    actualizarProfesor,
    eliminarProfesor
} from "../controllers/ProfesoresController.js";
import { CrearProfevalidations, ProfevalidationUpdate, validationId, } from "../middlewares/validations/Profesores.validation.js";
import { validate } from "../middlewares/validate.js";
const router = express.Router();

router.get("/", obtenerTodosLosProfesores);
router.get("/:id", validationId, validate, ObtenerProfesorPorId);
router.post("/", CrearProfevalidations, validate, crearProfesor);
router.put("/:id", ProfevalidationUpdate, validationId, validate, actualizarProfesor)
router.delete("/:id", validationId, validate, eliminarProfesor)

export default router;