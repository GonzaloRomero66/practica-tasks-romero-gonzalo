import { MateriaModel } from "../models/Materias.js";
import { ProfeModel } from "../models/Profesores.js";

export const obtenerTodasLasMaterias = async (req, res) => {
    try {
        const MateriasObtenidas = await MateriaModel.findAll({
            include: ProfeModel
        });

        return res.status(200).json(MateriasObtenidas);

    } catch (error) {
        res.status(500).json({
            message: "Error en el servidor",
            error: error.message
        });
    }
};


export const ObtenerMateriaPorId = async (req, res) => {
    try {
        const { id } = req.params;

        const MateriaEncontrada = await MateriaModel.findByPk(id, {
            include: ProfeModel
        });

        if (!MateriaEncontrada) {
            return res.status(404).json({
                message: "La materia no fue encontrada"
            });
        }

        return res.status(200).json(MateriaEncontrada);

    } catch (error) {
        res.status(500).json({
            message: "Error en el servidor",
            error: error.message
        });
    }
};


export const crearMateria = async (req, res) => {
    try {
        const { name, description, ProfeId } = req.body;

        await MateriaModel.create({
            name,
            description,
            ProfeId
        });

        return res.status(201).json({
            message: "Materia creada con exito"
        });

    } catch (error) {
        return res.status(500).json({
            message: "Error en el servidor",
            error: error.message
        });
    }
};


export const actualizarMateria = async (req, res) => {
    try {
        const { id } = req.params;
        const { name, description, ProfeId } = req.body;

        const MateriaEncontrada = await MateriaModel.findByPk(id);

        if (!MateriaEncontrada) {
            return res.status(404).json({
                message: "No existe esa materia"
            });
        }

        await MateriaEncontrada.update({
            name,
            description,
            ProfeId
        });

        return res.status(200).json({
            message: "Materia actualizada correctamente"
        });

    } catch (error) {
        return res.status(500).json({
            message: "Error en el servidor",
            error: error.message
        });
    }
};


export const eliminarMateria = async (req, res) => {
    try {
        const { id } = req.params;

        const MateriaEncontrada = await MateriaModel.findByPk(id);

        if (!MateriaEncontrada) {
            return res.status(404).json({
                message: "No existe esa materia"
            });
        }

        await MateriaEncontrada.destroy();

        return res.status(200).json({
            message: "Materia eliminada correctamente"
        });

    } catch (error) {
        return res.status(500).json({
            message: "Error en el servidor",
            error: error.message
        });
    }
};