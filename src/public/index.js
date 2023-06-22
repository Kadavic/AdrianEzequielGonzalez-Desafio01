const socket = io()
const addProduct = (data) => {
  //console.log(data)
  socket.emit("add", data)}
const deleteProduct = (data) => {
  socket.emit("eliminar", data)
}
const form = document.getElementById("form")
form.addEventListener("submit", () =>{
  const title = document.getElementById("title").value;
  const description = document.getElementById("description").value;
  const code = document.getElementById("code").value;
  const price = document.getElementById("price").value;
  const stock = document.getElementById("stock").value;
  const status = document.getElementById("status").value;
  const category = document.getElementById("category").value;
  addProduct({title, description, code, price, status, stock, category})})

const form1 = document.getElementById("form1")
form1.addEventListener("submit", ()=>{
  const item = document.getElementById("item-id").value;
  deleteProduct(item)
})