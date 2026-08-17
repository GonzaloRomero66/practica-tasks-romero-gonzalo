import express from "express";
import {
    obtenerTodosLosProfesores,
    ObtenerProfesorPorId,
    crearProfesor,
    actualizarProfesor,
    eliminarProfesor
} from "../controllers/ProfesoresController.js";

const router = express.Router();

router.get("/", obtenerTodosLosProfesores);
router.get("/:id", ObtenerProfesorPorId);
router.post("/", crearProfesor);
router.put("/:id", actualizarProfesor)
router.delete("/:id", eliminarProfesor)

export default router;