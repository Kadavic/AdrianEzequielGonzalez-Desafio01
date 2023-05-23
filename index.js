class ProductManager {
  constructor(){
    this.products = [];
  }
  addProduct(title, description, price, thumbnail, code, stock){
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
      return "Producto agregado"
    }else{
      return "Producto repetido o faltan características"
    }
  }
  getProducts(){
    return this.products
  }
  getProductById(id){
    const productFound = this.products.find(product => product.id === id)
    if (productFound){
      return productFound
    }else{
      return "Not found"
    }
  }
}
const productManager = new ProductManager();
console.log(productManager.getProducts());
console.log(productManager.addProduct("producto prueba","Este es un producto prueba", 200, "Sin imagen","abc123",25));
console.log(productManager.getProducts());
console.log(productManager.addProduct("producto prueba","Este es un producto prueba", 200, "Sin imagen","abc123",25));
console.log(productManager.getProductById(0));
console.log(productManager.getProductById(1));