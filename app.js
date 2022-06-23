//SUMA TOTAL DE PRODUCTOS QUE QUIERA EL USUARIO EN UNA COMPRA MAYORISTA
console.log("Carrito de compras")

console.log("Carrito de compras")

//Variables
const arrayObjetos = []
let menuOpcion = 0
let total = 0

//esconde botones de modificacion al iniciar 
document.getElementById("btnmodprod").hidden = true
document.getElementById("btneliminarprod").hidden = true


//escucha los botones
let botonAgregarProd = document.getElementById("btnagregarprod")
botonAgregarProd.addEventListener("click", clickAgregarProd)

let botonModProd = document.getElementById("btnmodprod")
botonModProd.addEventListener("click", clickModProd)

let botonEliminaProd = document.getElementById("btneliminarprod")
botonEliminaProd.addEventListener("click", clickEliminarProd)







//Funciones


function ingreso_Objeto_A_Array(producto) {
    //Push al array cada compra realizada
    arrayObjetos.push(producto)            

}

function pedirDatos() {
    let nombre = ""
    let valor = 0
    let cantidad = 0
    //Id interno del producto
    let idProducto = arrayObjetos.length + 1
    // Usuario ingresa el nombre del producto, ej: "Camisa"
    nombre = prompt("Ingrese nombre del producto")
    while (nombre == "" || nombre == undefined) {

        nombre = prompt("Ingrese nombre del producto")

    }
    // Usuario ingresa el valor de cada producto, ej: 10
    valor = +prompt("Ingrese el valor del producto")

    // Bucle para que ingrese un numero valido si es que se ingreso un caracter invalido
    while (valor == "" || valor == undefined || isNaN(valor)) {

        console.log("Por favor ingrese numeros validos. Vuelva a intentar.")
        valor = +prompt("Ingrese un valor de cada producto")
    }
    // Usuario ingresa la cantidad de unidades de ese mismo producto, ej: 3
    cantidad = +prompt("Ingrese la cantidad de unidades del producto")

    // Bucle para que ingrese un numero valido si es que se ingreso un caracter invalido
    while (cantidad == "" || cantidad == undefined || isNaN(cantidad)) {

        console.log("Por favor ingrese numeros validos. Vuelva a intentar.")
        cantidad = +prompt("Ingrese la cantidad de unidades del producto")

    }
    // Print de los valores ingresados para llevar un registro visual de lo que ingrese el usuario
    console.log("Producto ingresado: " + nombre)
    console.log("Valor de cada " + nombre + " : " + valor + "$")
    console.log("Cantidad ingresada: " + cantidad)
    return { 
        nombre: nombre,
        valor: valor,
        cantidad: cantidad,
        idProducto: idProducto
    }
}




//Funciones (botones)


//funcion click agregar producto
function clickAgregarProd(){
    const producto = pedirDatos()
    ingreso_Objeto_A_Array(producto)  
    hidennButonn()
    ListaPantalla()
}

//funcion click modificar producto
function clickModProd(){
    let modificacionOpcion = 0
    console.log("Cual producto desea modificar?")
    for(const producto of arrayObjetos){
        console.log(producto.idProducto + ". Producto: " + producto.nombre + ", valor: " + producto.valor + " y cantidad: " + producto.cantidad)
    }
    let idM = +prompt("Ingrese numero del producto")
    let indexM = arrayObjetos.findIndex((producto) => producto.idProducto == idM)
    if (indexM != -1){

        console.log("Opciones a modificar")
        console.log("1. Nombre del producto")
        console.log("2. Valor del producto")
        console.log("3. Cantidad del producto")
        console.log("0. Salir")
        modificacionOpcion = +prompt("Ingrese un numero según la opción a modificar")

    }else{
        
        console.log("Numero de producto invalido, por favor vuelva a intentar.")

    }

    
    switch(modificacionOpcion){
        case 1:
            if (indexM != -1){
                arrayObjetos[indexM].nombre = prompt("Ingrese el nuevo nombre del producto.")
                console.log("El producto: " + arrayObjetos[indexM].nombre + ", fue modificado con exito")
                break
            } else {
                console.log("Numero de producto invalido, por favor vuelva a intentar.")
            }
        case 2:
            if (indexM != -1){
                arrayObjetos[indexM].valor = prompt("Ingrese el nuevo valor del producto.")
                console.log("El producto: " + arrayObjetos[indexM].nombre + ", fue modificado con exito")
                break
            } else {
                console.log("Numero de producto invalido, por favor vuelva a intentar.")
            }
        case 3:
            if (indexM != -1){
                arrayObjetos[indexM].cantidad = prompt("Ingrese la nueva cantidad del producto.")
                console.log("El producto: " + arrayObjetos[indexM].nombre + ", fue modificado con exito")
                break
            } else {
                console.log("Numero de producto invalido, por favor vuelva a intentar.")
            }
    }
    ListaPantalla()
}

//funcion impime lista en pantalla
function ListaPantalla() {

    let contenedor = document.getElementById("contenedor")
    contenedor.innerHTML = ""
    total = 0
    for (const producto of arrayObjetos){
        total = total + ((producto.cantidad) * (producto.valor))
        const ul = document.createElement("ul")
        const id = document.createElement("p")
        const li1= document.createElement("li")
        const li2= document.createElement("li")
        const li3= document.createElement("li")

        id.innerText=  `ID: ${producto.idProducto}`
        li1.innerText= `Producto: ${producto.nombre}`
        li2.innerText= `Cantidad: ${producto.cantidad}`
        li3.innerText= `Valor: ${producto.valor}`

        ul.appendChild(li1).appendChild(li2).appendChild(li3)
        contenedor.appendChild(id).appendChild(ul)
    }
    let parrafo = document.createElement("h2")
    parrafo.innerText = `Monto total de la compra: $${total}`
    contenedor.append(parrafo)
}

//funcion click eliminar producto
function clickEliminarProd() {
    console.log("Cual producto desea eliminar?")
    for(const producto of arrayObjetos){
        console.log(producto.idProducto + ". Producto: " + producto.nombre + ", valor: " + producto.valor + " y cantidad: " + producto.cantidad)
    }
    let idE = +prompt("Ingrese numero del producto")
    let indexE = arrayObjetos.findIndex((producto) => producto.idProducto == idE)
    if (indexE != -1){
        let eliminado = arrayObjetos.splice(indexE,1)
        console.log("El producto: " + eliminado[0].nombre + ", fue eliminado con exito")
        arrayObjetos.forEach((producto, indice) => {
            producto.idProducto = indice + 1
        })
    } else {
        console.log("Nombre de producto invalido, por favor vuelva a intentar.")
    }
    hidennButonn()
    ListaPantalla()
}

//funcion esconder botones cuando no hay nada en la lista
function hidennButonn(){

    if (arrayObjetos.length != 0) {
    
        document.getElementById("btnmodprod").hidden = false
        document.getElementById("btneliminarprod").hidden = false
    
    }else{
    
        document.getElementById("btnmodprod").hidden = true
        document.getElementById("btneliminarprod").hidden = true
    }


}