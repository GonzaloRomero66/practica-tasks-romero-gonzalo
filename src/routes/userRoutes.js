import express from "express";
import {
    obtenerTodosLosUsuarios,
    ObtenerUsuarioPorId,
    crearUsuario,
    actualizarUsuario,
    eliminarUsuario
} from "../controllers/userController.js"

import { validations, validationUpdate, validationId } from "../middlewares/validations/User.validation.js";
import { validate } from "../middlewares/validate.js";

const router = express.Router();

router.get("/", obtenerTodosLosUsuarios)
router.get("/:id", validationId, validate, ObtenerUsuarioPorId)
router.post("/", validations, validate, crearUsuario)
router.put("/:id", validationUpdate, validationId, validate, actualizarUsuario)
router.delete("/:id", validationId, validate, eliminarUsuario)

export default router;

