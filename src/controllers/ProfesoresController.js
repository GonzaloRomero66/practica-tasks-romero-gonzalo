import { UserModel } from "../models/User.js";
import { TaskModel } from "../models/Task.js";
import { ProfeModel } from "../models/Profesores.js";
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

        if(typeof name !== "string"){
            return res.status(400).json({
                message: "El nombre debe ser de tipo caracter (string)"
            });
        }
        if(name.trim() === ""){
            return res.status(400).json({
                message: "El nombre no debe estar vacio"
            });
        }
        if(name.length > 20){
            return res.status(400).json({
                message: "El nombre debe ser menor a 20 caracteres"
            });
        }
        const NombreBuscado = await ProfeModel.findOne({
            where: {name}
        })
        if(NombreBuscado){
            return res.status(400).json({
                message: "El nombre ya existe"
            });
        }
        if(typeof email !== "string"){
            return res.status(400).json({
                message: "El email debe de ser tipo caracter (string)"
            });
        }
        if(email.trim() === ""){
            return res.status(400).json({
                message: "El email no puede estar vacia"
            });
        }
        if(email.length > 20){
            return res.status(400).json({
                message: "El email debe ser menor a 20 caracteres"
            })
        }
        if (typeof password !== "string"){
            return res.status(400).json({
                message: "La contrasena debe de ser tipo caracter (string)"
            })
        }
        if (password.trim() === ""){
            return res.status(400).json({
                message: "La contrasena no puede estar vacio"
            })
        }
        if (typeof speciality !== "string"){
            return res.status(400).json({
                message: "La especialidad debe de ser tipo caracter (string)"
            })
        }
        if (speciality.trim() === ""){
            return res.status(400).json({
                message: "La especialidad no puede estar vacia"
            })
        }
        if (speciality.length > 100){
            return res.status(400).json({
                message: "La especialidad debe ser menor a 100 caracteres"
            })
        }
        const UsuarioEncontrado = await UserModel.findByPk(UserId)
        if(!UsuarioEncontrado){
            return res.status(404).json({
                message: "El usuario indicado no existe"
            })
        }
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
        const { name, email, password, speciality, UserId } = req.body;
        const ProfesoresObtenidos = await ProfeModel.findByPk(id)
        if(!ProfesoresObtenidos){
            return res.status(404).json({
                message: "No existe este profesor"
            });
        }
        if(name !== undefined){
            if(typeof name !== "string"){
            return res.status(400).json({
                message: "El nombre debe ser de tipo caracter (string)"
            })
        }
            
        if(name.trim() === ""){
            return res.status(400).json({
                message: "El nombre no puede estar vacio"
            })
        }
        if(name.length > 20){
            return res.status(400).json({
                message: "El nombre debe ser menor a 20 caracteres"
            })
        }
        if(name !== ProfesoresObtenidos.name){
        const NombreBuscado = await ProfeModel.findOne({
            where: {name}
        })
        if (NombreBuscado){
            return res.status(400).json({
                message: "El nombre ya existe"
            });
        }
        }}
        if(email !== undefined){
        if(typeof email !== "string"){
            return res.status(400).json({
                message: "El email debe ser de tipo caracter (string)"
            });
        
            }
        if(email.trim() === ""){
            return res.status(400).json({
                message: "El email no puede estar vacia"
            });
        }
        if(email.length > 20)
            return res.status(400).json({
                message: "El email debe ser menor de 20 caracteres"
            })
        }
        if (password !== undefined){
            if(typeof password !== "string"){
                return res.status(400).json({
                    message: "La contrasena tiene que ser de tipo caracter (string)"
                });
            }
            if(password.trim() === ""){
                return res.status(400).json({
                    message: "La contrasena no puede estar vacia"
                });
            }}
            
            if (typeof speciality !== "string"){
                return res.status(400).json({
                message: "La especialidad debe de ser tipo caracter (string)"
            })
            }
            if (speciality.trim() === ""){
                return res.status(400).json({
                    message: "La especialidad no puede estar vacia"
                })
            }
            if (speciality.length > 100){
                return res.status(400).json({
                    message: "La especialidad debe ser menor a 100 caracteres"
                })
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


