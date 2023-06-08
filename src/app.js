import express from "express";
import { productManager } from "./productManager.js";

const app = express()

app.use(express.urlencoded({extended:true}))

app.get('/products',(req,res) => {
    const {limit} = req.query
    productManager.getProducts().then((products) =>{
        if(products.length===0) return res.send('No items')
        if(limit){
            return res.send(products.slice(0, limit))
        }
        res.send(products)
    }).catch(err => {
        res.send(`Ha ocurrido un error ${err} al cargar la pagina`)
    })
})

app.get('/products/:productId',(req,res)=>{
    const id = req.params.productId
    
    productManager.getProductById(id).then(product=>{
      res.send(product)
    }).catch(err => {
      res.send(`Ha ocurrido un error ${err} al cargar la página`)
    })
  })

app.listen(8080, () =>console.log("Servidor ON"))