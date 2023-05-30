import fs from "fs";

class ProductManager {
  constructor(path){
    this.products = [];
    this.path=path;
  }
  checkDB(){
    if(fs.existsSync(this.path)){
      this.products = JSON.parse(fs.readFileSync(this.path,'utf-8'))
    }
  }
  addProduct(title, description, price, thumbnail, code, stock){
    this.checkDB()
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
      fs.writeFileSync(this.path, JSON.stringify(this.products, null, '\t'))
      return "Producto agregado"
    }else{
      return "Producto repetido o faltan características"
    }
  }
  getProducts(){
    this.checkDB()
    return this.products
  }
  getProductById(id){
    this.checkDB()
    const productFound = this.products.find(product => product.id === id)
    if (productFound){
      return productFound
    }else{
      return "Not found"
    }
  }
  updateProduct(id,title,description,price,thumbnail,code,stock){
    this.checkDB()
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
      fs.writeFileSync(this.path, JSON.stringify(this.products, null, '\t'))
      return "Producto actualizado"
    }else{
      return "Not found"
    }
  }
  deleteProduct(id){
    this.checkDB()
    const indexFound = this.products.findIndex(product => product.id === id)
    if(indexFound !== -1){
      this.products.splice(indexFound,indexFound+1)
      fs.writeFileSync(this.path, JSON.stringify(this.products, null, '\t'))
      return "Producto eliminado"
    }else{
      return "Not found"
    }
  }
}
const productManager = new ProductManager("./products.json");

console.log(productManager.getProducts());
console.log(productManager.addProduct("producto prueba","Este es un producto prueba", 200, "Sin imagen","asd1",25));
console.log(productManager.updateProduct(1,"Malvón","Este es un producto prueba",200,"Sin imagen","asd2",25))
console.log(productManager.deleteProduct(5))
console.log(productManager.getProducts());
console.log(productManager.getProductById(1));