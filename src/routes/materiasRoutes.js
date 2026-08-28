import express from "express";
import {
    obtenerTodasLasMaterias,
    ObtenerMateriaPorId,
    crearMateria,
    actualizarMateria,
    eliminarMateria
} from "../controllers/MateriaController.js"
import { validationId, } from "../middlewares/validations/Profesores.validation.js";
import { validate } from "../middlewares/validate.js";
import { CrearMatevalidations, MatevalidationUpdate } from "../middlewares/validations/Materia.validation.js";

const router = express.Router()

router.get("/", obtenerTodasLasMaterias);
router.get("/:id", validationId, validate, ObtenerMateriaPorId);
router.post("/", CrearMatevalidations, validate, crearMateria);
router.put("/:id", validationId, MatevalidationUpdate, validate, actualizarMateria)
router.delete("/:id", validationId, validate, eliminarMateria)

export default router;