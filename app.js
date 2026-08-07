import express from 'express'
import dotenv from 'dotenv'

dotenv.config()
const app = express()

console.log(process.env.PORT)
const port = process.env.PORT

app.listen(port, () => {
    console.log(`Tu app esta re funcionando crack, idolo, master en el puerto ${port}`)
})