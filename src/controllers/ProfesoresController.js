import { UserModel } from "../models/User.js";
import { TaskModel } from "../models/Task.js";
import { ProfeModel } from "../models/Profesores.js";
import { matchedData } from "express-validator";
export const obtenerTodosLosProfesores = async (req, res) => {
    try {
        const ProfesoresObtenidos = await ProfeModel.findAll({attributes: {exclude: ["password"]}})
        return res.status(200).json(ProfesoresObtenidos);
    } catch (error) {
        res.status(500).json({ message: "Error en el servidor"})
    }
}
export const ObtenerProfesorPorId = async (req, res) => {
    try {
        const {id} = req.params;
        const ProfesorEncontrado = await ProfeModel.findByPk(id, {attributes: {exclude: ["password"]}});

        if(!ProfesorEncontrado) {
            return res.status(404).json({
                message: "El profesor no fue encontrado"
            })
        }
        return res.status(200).json(ProfesorEncontrado)
    } 
    catch {
        res.status(500).json({
            message: "Error en el servidor"
        });

    }
}

///Crear usuario
export const crearProfesor = async (req, res) => {
    try {
        const {name, email, password, speciality, UserId} = req.body;

        await ProfeModel.create({
            name,
            email,
            password,
            speciality,
            UserId  
        });
        return res.status(201).json({
            message: "El profesor fue creado con exito"
        });
    }
    catch (error) {
        return res.status(500).json({
            message: "Error en el servidor"
        })
    }
}


/// Actualizar Usuario
export const actualizarProfesor = async (req, res) => {
    try {
        const {id} = req.params
        const datos = matchedData(datos);
        const ProfesoresObtenidos = await ProfeModel.findByPk(id)
        if(!ProfesoresObtenidos){
            return res.status(404).json({
                message: "No existe este profesor"
            });
        }
        
        await ProfesoresObtenidos.update({
            name,
            email,
            password,
            speciality
        });
        return res.status(200).json({
            message: "Profesor actualizado correctamente"
        })
    } 
    catch (error) {
        return res.status(500).json({
            message: "Error en el servidor", error: error.message
        });
    }
}
export const eliminarProfesor = async (req, res) => {
    try{
        const {id} = req.params;
        const ProfesorEncontrado = await ProfeModel.findByPk(id);
    if (!ProfesorEncontrado){
        return res.status(404).json({
            message: "No existe este profesor"
        });
        }
        await ProfesorEncontrado.destroy();
        return res.status(200).json({
            message: "Profesor eliminado correctamente"
        })
    }
    catch (error) {
        return res.status(500).json({
            message: "Error en el servidor"
        });
}
};


