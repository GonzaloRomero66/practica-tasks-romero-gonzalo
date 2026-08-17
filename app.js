import express from 'express'
import "./relations.js"
import dotenv from 'dotenv'
import taskRoutes from "./src/routes/taskRoutes.js"
import userRoutes from "./src/routes/userRoutes.js"
import profeRoutes from "./src/routes/profesoresRoutes.js"
import materiasRoutes from "./src/routes/materiasRoutes.js"
dotenv.config()

import { sequelize } from "./src/config/database.js"

const app = express()
app.use(express.json());
app.use("/profesores", profeRoutes)
app.use("/user", userRoutes)
app.use("/task", taskRoutes)
app.use("/materias", materiasRoutes)

console.log(process.env.PORT)
const port = process.env.PORT

await sequelize.sync({force: true}),
app.listen(port, () => {
    console.log(`Tu app esta re funcionando crack, idolo, master en el puerto ${port}`)
})