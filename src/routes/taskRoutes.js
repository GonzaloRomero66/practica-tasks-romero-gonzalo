import express from "express";
import {
    obtenerTodasLasTareas,
    ObtenerTareaPorId,
    crearTarea,
    actualizarTarea,
    eliminarTarea
} from "../controllers/taskController.js"
import { validationId, validations, validationUpdate } from "../middlewares/validations/Task.validation.js";
import { validate } from "../middlewares/validate.js";

const router = express.Router();

router.get("/", obtenerTodasLasTareas)
router.get("/:id", validationId, validate, ObtenerTareaPorId)
router.post("/", validations, validate, crearTarea)
router.put("/:id", validationUpdate, validationId, validate, actualizarTarea)
router.delete("/:id", validationId, validate, eliminarTarea)

export default router;