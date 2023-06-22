import fs from "fs";

class ProductManager {
  constructor(path){
    this.products = [];
    this.path=path;
  }
  async checkDB(){
    this.products = JSON.parse(await fs.promises.readFile(this.path,'utf-8'))
  }
  async updateDB(){
      await fs.promises.writeFile(this.path, JSON.stringify(this.products,null,'\t')) 
  }
  async addProduct({title, description, code, price, status=true, stock, category, thumbnails=[]}){
    await this.checkDB()
    const isInArray = this.products.some(product => product.code === code)
    return new Promise((res,rej)=>{
      if(isInArray === false){
        this.products.push({
          id: this.products.length,
          title: title,
          description: description,
          code: code,
          price: price,
          status: status,
          stock: stock,
          category: category,
          thumbnails: thumbnails    
        });
        this.updateDB().then(
          res("Product added")
        )
      }else{
        rej("Repeated product or items lacking")
      }
    })
    
  }
  async getProducts(){
    await this.checkDB()
    return new Promise((res,rej)=>{
      if(this.products){
        res(this.products)
      }else{
        rej("No products found")
      }
    })
  }
  async getProductById(id){
    await this.checkDB()
    const productFound = this.products.find(product => product.id === parseInt(id))
    return new Promise((res,rej)=>{
      if(productFound){
        res(productFound)
      }else{
        rej("The product isn't in Products DB")
      }
    })
  }
  async updateProduct({id, title, description, code, price, status, stock, category, thumbnails}){
    await this.checkDB()
    const indexFound = this.products.findIndex(product => product.id === parseInt(id))
    return new Promise((res,rej)=>{
      if(indexFound !== -1){
        this.products[indexFound] = {
          id: id,
          title: title,
          description: description,
          code: code,
          price: price,
          status: status,
          stock: stock,
          category: category,
          thumbnails: thumbnails 
        }
        this.updateDB().then(
          res("Producto actualizado")  
        )
      }else{
        rej("Product not found") 
      }
    })
  }
  async deleteProduct(id){
    await this.checkDB()
    const indexFound = this.products.findIndex(product => product.id === parseInt(id))
    return new Promise((res,rej)=>{
      if(indexFound !== -1){
        this.products.splice(indexFound,indexFound+1)
        this.updateDB().then(
          res("Product deleted") 
        )
      }else{
        rej("Product not found")
      }
    })
  }
}
export const productManager = new ProductManager("./src/products.json");

