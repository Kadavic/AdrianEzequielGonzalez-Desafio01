import express, { urlencoded } from "express"
import handlebars from "express-handlebars"
import __dirname from "./utils.js"
import {Server} from 'socket.io'
import viewsRouter from "./routes/views.router.js"
import { productManager } from "./productManager.js"

const app = express()
app.use(express.json())
app.use(urlencoded({extended:true}))
app.engine('handlebars',handlebars.engine())
app.set('views',__dirname+"/views")
app.set('view engine','handlebars')
app.use(express.static(__dirname+"/public"))

const PORT = 8080
const httpServer = app.listen(PORT, ()=>{
  console.log("Servidor escuchando en el puerto: 8080")
})
app.use("/",viewsRouter)
const io = new Server(httpServer)
io.on("connection",socket=>{
  console.log("Nueva conexión")
  socket.on("add", data=>{
    productManager.addProduct(data)
    .then(
      productManager.getProducts()
      .then(data=>{
        socket.emit(data)
      })
    )})
  socket.on("eliminar",data=>{
    console.log("entro eliminar")
    productManager.deleteProduct(data)
    .then(
      productManager.getProducts()
      .then(data=>{
        socket.emit(data)
      })
    )
  })
})
app.set('socketio',io)