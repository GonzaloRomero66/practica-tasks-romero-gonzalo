import { json } from "sequelize";
import { TaskModel } from "../models/Task";
export const obtenerTodasLasTareas = async (req, res) => {
    try {
        const TareasObtenidas = await TaskModel.findAll()
        return res.status(200),json(TareasObtenidas);
    } catch (error) {
        res.status(500).json({ message: "Error en el servidor"})
    }
}