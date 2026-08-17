import { DataTypes } from "sequelize";
import { sequelize } from "../config/database.js";

export const ProfeModel = sequelize.define("profesor", {
    
     name: {
        type: DataTypes.STRING(100),
        allowNull: false
    },
    email: {
        type: DataTypes.STRING(100),
        unique: true,
        allowNull: false
    },
    password: {
        type: DataTypes.STRING(100),
        allowNull: false
    },
    speciality: {
        type: DataTypes.STRING(100),
        allowNull: false
    },
    UserId: {
        type: DataTypes.INTEGER,
        allowNull: false
    }
    },
    {
    defaultScope: {
        attributes: {
            exclude: ["password"]
        }
    }
})