import express from "express";
import {
    obtenerTodasLasMaterias,
    ObtenerMateriaPorId,
    crearMateria,
    actualizarMateria,
    eliminarMateria
} from "../controllers/MateriaController.js"

const router = express.Router()

router.get("/", obtenerTodasLasMaterias);
router.get("/:id", ObtenerMateriaPorId);
router.post("/", crearMateria);
router.put("/:id", actualizarMateria)
router.delete("/:id", eliminarMateria)

export default router;