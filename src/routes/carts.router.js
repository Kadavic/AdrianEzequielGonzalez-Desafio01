import { Router } from "express";
import {cartManager} from "../cartManager.js";
const routerCarts = Router()

routerCarts.post('/', (req,res) => {
  const products = req.body
  cartManager.addCart(products)
  .then(resolve => res.status(200).send({status: 'success', message: `${resolve}`}))
  .catch(error =>res.status(400).send({status: 'error', error: `${error}`}))
})

routerCarts.get('/:cid', (req,res)=>{
  const cartId = req.params.cid
  cartManager.getCartById(cartId)
  .then(products=> res.status(200).send(products))
  .catch(error =>res.status(404).send({status: 'error', error: `${error}`}))
})

routerCarts.post('/:cid/product/:pid', (req,res)=>{
  const cartId = req.params.cid
  const productId = req.params.pid
  cartManager.addProduct(cartId,productId)
  .then(resolve => res.status(200).send({status: 'success', message: `${resolve}`}))
  .catch(error =>res.status(400).send({status: 'error', error: `${error}`}))
})
export default routerCarts