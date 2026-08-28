import { TaskModel } from "../models/Task.js";
import { UserModel } from "../models/User.js";
import { MateriaModel } from "../models/Materias.js";
import { matchedData } from "express-validator";
export const obtenerTodasLasTareas = async (req, res) => {
    try {
        const TareasObtenidas = await TaskModel.findAll({include: [UserModel, MateriaModel]})
        return res.status(200).json(TareasObtenidas);
    } catch (error) {
        res.status(500).json({ message: "Error en el servidor", error: error.message})
    }
}
export const ObtenerTareaPorId = async (req, res) => {
    try {
        const {id} = req.params;
        const TareaEncontrada = await TaskModel.findByPk(id,{include: [UserModel, MateriaModel]});

        if(!TareaEncontrada) {
            return res.status(404).json({
                message: "La tarea no fue encontrada"
            })
        }
        return res.status(200).json(TareaEncontrada)
    } 
    catch {
        res.status(500).json({
            message: "Error en el servidor"
        });

    }
}
export const crearTarea = async (req, res) => {
    try {
        const {title, description, UserId, isComplete, MateriaId} = req.body;

        await TaskModel.create({
            title,
            description,
            UserId,
            isComplete,
            MateriaId
        });
        return res.status(201).json({
            message: "Tarea creada con exito"
        });
    }
    catch (error) {
        return res.status(500).json({
            message: "Error en el servidor",
            error: error.message
        })
    }
}
export const actualizarTarea = async (req, res) => {
    try {
        const {id} = req.params
        const datos = matchedData(req);

        const TareasObtenidas = await TaskModel.findByPk(id, {include: UserModel})

        if(!TareasObtenidas){
            return res.status(404).json({
                message: "No existe esa tarea"
            });
        }

        await TareasObtenidas.update(datos);
        return res.status(200).json({
            message: "Tarea actualizada correctamente"
        });
    }
    catch (error) {
        return res.status(500).json({
            message: "Error en el servidor"
        });
    }
};
    

export const eliminarTarea = async (req, res) => {
    try{
        const {id} = req.params;
        const TareaEncontrada = await TaskModel.findByPk(id, {include: UserModel});
    if (!TareaEncontrada){
        return res.status(404).json({
            message: "No existe esa tarea"
        });
        }
        await TareaEncontrada.destroy();
        return res.status(200).json({
            message: "Tarea eliminada correctamente"
        })
    }
    catch (error) {
        return res.status(500).json({
            message: "Error en el servidor"
        });
}
};

