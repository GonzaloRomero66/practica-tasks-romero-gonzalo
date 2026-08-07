import { Sequelize } from "sequelize";
import dotenv from 'dotenv'

dotenv.config()
const sequelize = new Sequelize(
    process.env.DB_NAME,
    process.env.DB_USER,
    process.env.DB_PASSWORD,
    {
    host: process.env.DB_HOST,
    dialect: "mysql"
}
)
export const startDB = async () => {
    try {
        await sequelize.authenticate();
        await sequelize.sync({force: true});
        console.log("Tu base de datos esta en perfecto funcionamiento")
    }
    catch (error) {
    console.error(error)
    console.log("Error para conectar a la base de datos",error)
    }
}
