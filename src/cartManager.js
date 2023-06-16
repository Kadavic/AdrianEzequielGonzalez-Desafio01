import fs from "fs";
import { productManager } from "./productManager.js";

class CartManager {
  constructor(path){
    this.path = path;
    this.carts = []
  }

  async checkDB(){
    this.carts = JSON.parse(await fs.promises.readFile(this.path,'utf-8'))
  }
  async updateDB(){
    await fs.promises.writeFile(this.path, JSON.stringify(this.carts, null, '\t'))
  }

  async addCart(products) {
    await this.checkDB();
    let productsFromDB;
  
    try {
      productsFromDB = await productManager.getProducts();
  
      const productsArray = JSON.parse(products).map((product) => ({
        id: product.id,
        quantity: product.quantity
      }));
  
      for (const product of productsArray) {
        const indexFound = productsFromDB.findIndex((item) => item.id === product.id);
        if (indexFound === -1) {
          throw new Error("One of the items in the cart is not in inventory");
        }
      }
  
      this.carts.push({
        cartId: this.carts.length,
        products: productsArray
      });
  
      await this.updateDB();
  
      return "Cart added";
    } catch (error) {
      throw new Error(`Error adding cart: ${error.message}`);
    }
  }

  async getCartById(cartId){
    await this.checkDB()
    const cart = this.carts.find(cart => cart.cartId === cartId)
    return new Promise((res,rej)=>{
      if(cart){
        res(cart.products)
      }else{
        rej("Cart not found")
      }
    })
  }
  async addProduct(cartId, productId){
    await this.checkDB()
    const cartIndex = this.carts.findIndex(cart => cart.cartId === cartId)
    const productFound = await productManager.getProductById(productId)
    return new Promise((res,rej)=>{
      if(cartIndex!==-1){
        const productIndex = this.carts[cartIndex].products.findIndex(product => product.id === productId)
        if(productIndex!==-1){
          this.carts[cartIndex].products[productIndex].quantity+=1
        }else{
          this.carts[cartIndex].products.push({id:productId, quantity: 1})
        }
        this.updateDB().then(res(`Product successfuly added to Cart with ID: ${cartId} `))
      }else{
        rej("Cart not found")
      }
    })
  }
}

export const cartManager = new CartManager("./src/carts.json");