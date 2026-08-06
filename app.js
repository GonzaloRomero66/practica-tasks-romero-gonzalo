import express from 'express'
const app = express()

const port = 3000

app.listen(port, () => {
    console.log(`Tu app esta re funcionando crack, idolo, master en el puerto ${port}`)
})