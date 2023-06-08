import fs from "fs";

class ProductManager {
  constructor(path){
    this.products = [];
    this.path=path;
  }
  async checkDB(){
    if(fs.existsSync(this.path)){
      this.products = JSON.parse(await fs.promises.readFile(this.path,'utf-8'))
    }
  }
  async updateDB(){
    await fs.promises.writeFile(this.path, JSON.stringify(this.products, null, '\t'))
  }
  async addProduct(title, description, price, thumbnail, code, stock){
    await this.checkDB()
    const isInArray = this.products.some(product => product.code === code)
    if(isInArray === false && title && description && price && thumbnail && stock){
      this.products.push({
        id: this.products.length,
        title: title,
        description: description,
        price: price,
        thumbnail: thumbnail,
        code: code,
        stock: stock
      });
      this.updateDB
      return "Producto agregado"
    }else{
      return "Producto repetido o faltan características"
    }
  }
  async getProducts(){
    await this.checkDB()
    return this.products
  }
  async getProductById(id){
    await this.checkDB()
    const productFound = this.products.find(product => product.id === parseInt(id))
    if (productFound){
      return productFound
    }else{
      return "Product not found"
    }
  }
  async updateProduct(id,title,description,price,thumbnail,code,stock){
    await this.checkDB()
    const indexFound = this.products.findIndex(product => product.id === id)
    if(indexFound !== -1){
      this.products[indexFound] = {
        id: id,
        title: title,
        description: description,
        price: price,
        thumbnail: thumbnail,
        code: code,
        stock:stock
      }
      await this.updateDB()
      return "Producto actualizado"
    }else{
      return "Not found"
    }
  }
  async deleteProduct(id){
    await this.checkDB()
    const indexFound = this.products.findIndex(product => product.id === id)
    if(indexFound !== -1){
      this.products.splice(indexFound,indexFound+1)
      await this.updateDB()
      return "Producto eliminado"
    }else{
      return "Not found"
    }
  }
}
export const productManager = new ProductManager("./products.json");

