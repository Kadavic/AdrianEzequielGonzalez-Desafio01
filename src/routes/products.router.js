import { Router } from "express";
import { productManager } from "../productManager.js";
const routerProducts = Router()

routerProducts.get('/', (req,res) => {
  const {limit} = req.query
  productManager.getProducts()
  .then((products)=>{
    if(products.length===0) return res.status(404).send('No items')
    if(limit){
      return res.status(200).send(products.slice(0,limit))
    }
    res.status(200).send(products)
  })
  .catch(error =>res.status(404).send({status: 'error', error: `${error}`}))
})

routerProducts.get('/:productId',(req,res)=>{
  const id = req.params.productId
  productManager.getProductById(id)
  .then(product=>res.status(200).send(product))
  .catch(error =>res.status(404).send({status: 'error', error: `${error}`}))
})

routerProducts.post('/',(req,res)=>{
  const product = req.body
  if(!product.title || !product.description || !product.price || !product.stock || !product.category || !product.code){
    return res.status(400).send({status: 'error', error: 'incomplete values'})
  }
  productManager.addProduct(product)
  .then(resolve=>res.status(200).send({status:'success', message: `${resolve}`}))
  .catch(error=>res.status(400).send({status: 'error', error: `${error}`}))
})

routerProducts.put('/:productId', (req,res)=>{
  const id = req.params.productId
  const product= {id, ...req.body}
  if(!product.title || !product.description || !product.price || !product.stock || !product.category || !product.code){
    return res.status(400).send({status: 'error', error: 'incomplete values'})
  }
  productManager.updateProduct(product)
  .then(resolve=>res.status(200).send({status:'success', message: `${resolve}`}))
  .catch(error=>res.status(404).send({status: 'error', error: `${error}`}))
})

routerProducts.delete('/:productId', (req,res)=>{
  const id = req.params.productId
  productManager.deleteProduct(id)
  .then(resolve=>res.status(200).send({status:'success', message: `${resolve}`}))
  .catch(error=>res.status(404).send({status: 'error', error: `${error}`}))
})
export default routerProducts