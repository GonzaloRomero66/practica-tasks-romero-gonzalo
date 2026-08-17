import { DataTypes } from "sequelize";
import { sequelize } from "../config/database.js"

export const TaskModel = sequelize.define("task", {
    title: {
        type: DataTypes.STRING(100),
        allowNull: false
    },
    description: {
        type: DataTypes.STRING(100),
        allowNull: false
    },
    isComplete: {
        type: DataTypes.BOOLEAN,
        defaultValue: false
    },
    UserId: {
        type: DataTypes.INTEGER,
        allowNull: false        
    },
    MateriaId: {
        type: DataTypes.INTEGER,
        allowNull: false
    }
})



