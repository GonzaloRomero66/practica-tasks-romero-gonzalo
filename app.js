    import express from 'express'
    import dotenv from 'dotenv'
    import taskRoutes from "./src/routes/taskRoutes.js"
    import userRoutes from "./src/routes/userRoutes.js"

    dotenv.config()

    import { sequelize } from "./src/config/database.js"

    const app = express()
    app.use(express.json());
    app.use("/user", userRoutes)
    app.use("/task", taskRoutes)

    console.log(process.env.PORT)
    const port = process.env.PORT

    await sequelize.sync(),
    app.listen(port, () => {
        console.log(`Tu app esta re funcionando crack, idolo, master en el puerto ${port}`)
    })