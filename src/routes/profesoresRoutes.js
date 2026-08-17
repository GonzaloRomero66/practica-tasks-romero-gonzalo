import express from "express";
import {
    obtenerTodosLosProfesores,
    ObtenerProfesorPorId,
    crearProfesor,
} from "../controllers/ProfesoresController.js";

const router = express.Router();

router.get("/", obtenerTodosLosProfesores);
router.get("/:id", ObtenerProfesorPorId);
router.post("/", crearProfesor);

export default router;