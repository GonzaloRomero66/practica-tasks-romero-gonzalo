import express from "express";
import {
    obtenerTodosLosUsuarios,
    ObtenerUsuarioPorId,
    crearUsuario,
    actualizarUsuario,
    eliminarUsuario
} from "../controllers/userController.js"

import { validations, validate } from "../middlewares/validations/User.validation.js";

const router = express.Router();

router.get("/", obtenerTodosLosUsuarios)
router.get("/:id", ObtenerUsuarioPorId)
router.post("/", validations, validate, crearUsuario)
router.put("/:id", actualizarUsuario)
router.delete("/:id", eliminarUsuario)

export default router;

