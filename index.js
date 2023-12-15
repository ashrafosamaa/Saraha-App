import express  from "express"
import db_connection from "./DB/connection.js"
import userRouter from "./src/modules/User/user.routes.js"
import msgRouter from "./src/modules/Message/msg.routes.js"
import { config } from "dotenv"
import { globalResponse } from "./src/middlewares/globalResponse.js"

config({path: './config/dev.config.env'})

const app = express()
const port = process.env.PORT

app.use(express.json())
app.use('/user', userRouter)
app.use('/msg', msgRouter)
app.use(globalResponse)

db_connection()

app.listen(port, ()=>{
    console.log(`running on port ${port}`)})
