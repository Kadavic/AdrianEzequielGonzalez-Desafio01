import express from "express"
import { productManager } from '../productManager.js'
const viewsRouter = express.Router()
viewsRouter.get("/",(req,res)=>{
  productManager.getProducts()
  .then((products)=>{
    if(products.length===0) return res.status(404).render('No items')
    res.status(200).render("index",{titulo: "Productos",products})
  })
  .catch(error =>res.status(404).render("index",{status: 'error', error: `${error}`}))
})

viewsRouter.get("/realtimeproducts",(req,res)=>{
  productManager.getProducts()
  .then((products)=>{
    if(products.length===0) return res.status(404).render('No items')
    res.status(200).render("realTimeProducts",{titulo: "Productos con Socket.io",products})
  })
  .catch(error =>res.status(404).render("realTimeProducts",{status: 'error', error: `${error}`}))
})

export default viewsRouter;