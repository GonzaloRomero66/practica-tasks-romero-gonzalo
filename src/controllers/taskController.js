import { TaskModel } from "../models/Task.js";
import { UserModel } from "../models/User.js";
export const obtenerTodasLasTareas = async (req, res) => {
    try {
        const TareasObtenidas = await TaskModel.findAll({include: UserModel})
        return res.status(200).json(TareasObtenidas);
    } catch (error) {
        res.status(500).json({ message: "Error en el servidor", error: error.message})
    }
}
export const ObtenerTareaPorId = async (req, res) => {
    try {
        const {id} = req.params;
        const TareaEncontrada = await TaskModel.findByPk(id,{
            include: UserModel
        });

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
        const {title, description, UserId, isComplete} = req.body;

        if(typeof title !== "string"){
            return res.status(400).json({
                message: "El titulo debe ser de tipo caracter (string)"
            });
        }
        if(title.trim() === ""){
            return res.status(400).json({
                message: "El titulo no debe estar vacio"
            });
        }
        if(title.length > 100){
            return res.status(400).json({
                message: "El titulo debe ser menor a 100 caracteres"
            });
        }
        const tituloBuscado = await TaskModel.findOne({
            where: {title}
        })
        if(tituloBuscado){
            return res.status(400).json({
                message: "El titulo ya existe"
            });
        }
        if(typeof description !== "string"){
            return res.status(400).json({
                message: "La descripcion debe de ser tipo caracter (string)"
            });
        }
        if(description.trim() === ""){
            return res.status(400).json({
                message: "La descripcion no puede estar vacia"
            });
        }
        if(description.length > 100){
            return res.status(400).json({
                message: "La descripcion debe ser menor a 100 caracteres"
            })
        }
        if(typeof isComplete !== "boolean"){
            return res.status(400).json({
                message: "Tarea completada debe ser de tipo boolean (true / false)"
            })
        }
        if(!UserId) {
            return res.status(400).json({
                message: "El usuario es obligatorio"
            })
        }
        const UsuarioEncontrado = await UserModel.findByPk(UserId);
        if(!UsuarioEncontrado){
            return res.status(404).json({
                message: "Usuario no existe"
            })
        }

        await TaskModel.create({
            title,
            description,
            UserId,
            isComplete
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
        const { title, description, UserId, isComplete } = req.body;

        const TareasObtenidas = await TaskModel.findByPk(id, {include: UserModel})

        if(!TareasObtenidas){
            return res.status(404).json({
                message: "No existe esa tarea"
            });
        }

        if(title !== undefined){
        if(title !== TareasObtenidas.title){
        const tituloBuscado = await TaskModel.findOne({
            where: {title}
        })
        if (tituloBuscado){
            return res.status(400).json({
                message: "El titulo ya existe"
            });
            }
        }}
        if(description !== undefined){
        if(typeof description !== "string"){
            return res.status(400).json({
                message: "La descripcion debe ser de tipo caracter (string)"
            });
        
            }
        if(description.trim() === ""){
            return res.status(400).json({
                message: "La descripcion no puede estar vacia"
            });
        }
        if(description.length > 100)
            return res.status(400).json({
                message: "La descripcion debe ser menor de 100 caracteres"
            })
        }
        if (isComplete !== undefined){
            if(typeof isComplete !== "boolean"){
                return res.status(400).json({
                    message: "Tarea completada debe ser de tipo boolean (true / false)"
                });
            }
        }
        await TareasObtenidas.update({
            title,
            description,
            UserId,
            isComplete
        });
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

