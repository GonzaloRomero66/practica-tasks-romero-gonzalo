import { UserModel } from "../models/User.js";
import { TaskModel } from "../models/Task.js";
export const obtenerTodosLosUsuarios = async (req, res) => {
    try {
        const UsuariosObtenidos = await UserModel.findAll({include: TaskModel, attributes: {exclude: ["password"]}})
        return res.status(200).json(UsuariosObtenidos);
    } catch (error) {
        res.status(500).json({ message: "Error en el servidor"})
    }
}
export const ObtenerUsuarioPorId = async (req, res) => {
    try {
        const {id} = req.params;
        const UsuarioEncontrado = await UserModel.findByPk(id, {include: TaskModel, attributes: {exclude: ["password"]}});

        if(!UsuarioEncontrado) {
            return res.status(404).json({
                message: "El usuario no fue encontrado"
            })
        }
        return res.status(200).json(UsuarioEncontrado)
    } 
    catch {
        res.status(500).json({
            message: "Error en el servidor"
        });

    }
}

///Crear usuario
export const crearUsuario = async (req, res) => {
    try {
        const {name, email, password} = req.body;
        
        const NombreBuscado = await UserModel.findOne({
            where: {name}
        })
        if(NombreBuscado){
            return res.status(400).json({
                message: "El nombre ya existe"
            });
        }

        await UserModel.create({
            name,
            email,
            password
        });
        return res.status(201).json({
            message: "Usuario creado con exito"
        });
    }
    catch (error) {
        return res.status(500).json({
            message: "Error en el servidor"
        })
    }
}


/// Actualizar Usuario
export const actualizarUsuario = async (req, res) => {
    try {
        const {id} = req.params
        const { name, email, password } = req.body;
        const UsuariosObtenidos = await UserModel.findByPk(id)
        if(!UsuariosObtenidos){
            return res.status(404).json({
                message: "No existe este usuario"
            });
        }
        if(name !== UsuariosObtenidos.name){
        const NombreBuscado = await UserModel.findOne({
            where: {name}
        })
        if (NombreBuscado){
            return res.status(400).json({
                message: "El nombre ya existe"
            });
        }
        }
        
        await UsuariosObtenidos.update({
            name,
            email,
            password
        });
        return res.status(200).json({
            message: "Usuario actualizado correctamente"
        })
    
     } catch (error) {
        return res.status(500).json({
            message: "Error en el servidor"
        });
    }
}
export const eliminarUsuario = async (req, res) => {
    try{
        const {id} = req.params;
        const UsuarioEncontrado = await UserModel.findByPk(id);
    if (!UsuarioEncontrado){
        return res.status(404).json({
            message: "No existe este usuario"
        });
        }
        await UsuarioEncontrado.destroy();
        return res.status(200).json({
            message: "Usuario eliminado correctamente"
        })
    }
    catch (error) {
        return res.status(500).json({
            message: "Error en el servidor"
        });
}
};


