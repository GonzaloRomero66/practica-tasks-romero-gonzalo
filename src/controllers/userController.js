import { UserModel } from "../models/User.js";
export const obtenerTodosLosUsuarios = async (req, res) => {
    try {
        const UsuariosObtenidos = await UserModel.findAll()
        return res.status(200).json(UsuariosObtenidos);
    } catch (error) {
        res.status(500).json({ message: "Error en el servidor"})
    }
}
export const ObtenerUsuarioPorId = async (req, res) => {
    try {
        const {id} = req.params;
        const UsuarioEncontrado = await UserModel.findByPk(id);

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
        const NombreBuscado = await UserModel.findOne({
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
        if(name !== UsuariosObtenidos.name){
           const NombreBuscado = await UserModel.findOne({
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
    } 
     catch (error) {
        return res.status(500).json({
            message: "Error en el servidor"
        });
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

}
