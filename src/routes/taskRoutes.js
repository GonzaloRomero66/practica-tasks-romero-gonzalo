import express from "express";
import {
    obtenerTodasLasTareas,
    ObtenerTareaPorId,
    crearTarea,
    actualizarTarea,
    eliminarTarea
} from "../controllers/taskController.js"

const router = express.router();

router.get("/", obtenerTodasLasTareas)
router.get("/:id", ObtenerTareaPorId)
router.post("/", crearTarea)
router.pot("/:id", actualizarTarea)
router.delete("/", eliminarTarea)

export default router;