//SUMA TOTAL DE PRODUCTOS QUE QUIERA EL USUARIO EN UNA COMPRA MAYORISTA
console.log("Carrito de compras")

console.log("Carrito de compras")

//Variables
let total = 0
const arrayObjetos = JSON.parse(localStorage.getItem("ListaProductos"))

if (arrayObjetos == undefined || arrayObjetos == ""){
    //esconde botones de modificacion al iniciar 
    document.getElementById("ulElimina").hidden = true
    document.getElementById("ulMod").hidden = true
}else{
    hidennButonn()
    ListaPantalla()
}






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
    let nombreProducto = document.querySelector("#nombreProducto")
    let valorProducto = document.querySelector("#valorProducto")
    let cantidadProducto = document.querySelector("#cantidadProducto")
    nombre = nombreProducto.value
    valor = valorProducto.value
    cantidad = cantidadProducto.value
    nombreProducto.value = ""
    valorProducto.value = ""
    cantidadProducto.value = ""
    if (nombre == "" || nombre == undefined || valor == "" || valor == undefined || isNaN(valor) || cantidad == "" || cantidad == undefined || isNaN(cantidad)){
        
    }else{

        //Id interno del producto
        let idProducto = arrayObjetos.length + 1
        
        //Return de los valors del objeto
        return { 
            nombre: nombre,
            valor: valor,
            cantidad: cantidad,
            idProducto: idProducto
        }
    }
}


//Funciones (botones)

//funcion click agregar producto
function clickAgregarProd(){
    const producto = pedirDatos()
    if (producto != undefined){
        ingreso_Objeto_A_Array(producto)  
        hidennButonn()
        ListaPantalla()
        almacenarLocal()
    }

}

//funcion click modificar producto
function clickModProd(){
    let nombre = ""
    let valor = 0
    let cantidad = 0
    let nombreProducto = document.querySelector("#nombreModProducto")
    let valorProducto = document.querySelector("#valorModProducto")
    let cantidadProducto = document.querySelector("#cantidadModProducto")
    nombre = nombreProducto.value
    valor = valorProducto.value
    cantidad = cantidadProducto.value


    let idM = 0
    let idProducto = document.querySelector("#idModProducto")
    idM = idProducto.value

    idProducto.value = ""
    nombreProducto.value = ""
    valorProducto.value = ""
    cantidadProducto.value = ""

    let indexM = arrayObjetos.findIndex((producto) => producto.idProducto == idM)
    if (indexM != -1){
        if (nombre != "" && nombre != undefined && valor != "" && valor != undefined && isNaN(valor) == true && cantidad != "" && cantidad != undefined && isNaN(cantidad) == true){

            arrayObjetos[indexM].nombre = nombre
            arrayObjetos[indexM].valor = valor
            arrayObjetos[indexM].cantidad = cantidad

        }else{
            if(nombre != "" && nombre != undefined){
                arrayObjetos[indexM].nombre = nombre
            }
            if(valor != "" && valor != undefined && isNaN(valor) == false){
                arrayObjetos[indexM].valor = valor
            }
            if(cantidad != "" && cantidad != undefined && isNaN(cantidad) == false){
                arrayObjetos[indexM].cantidad = cantidad
            }
        }
    }
    ListaPantalla()
    almacenarLocal()
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
        li2.innerText= `Valor: ${producto.valor}`
        li3.innerText= `Cantidad: ${producto.cantidad}`

        ul.appendChild(li1).appendChild(li2).appendChild(li3)
        contenedor.appendChild(id).appendChild(ul)
    }
    let parrafo = document.createElement("h2")
    parrafo.innerText = `Monto total de la compra: $${total}`
    contenedor.append(parrafo)
}

//funcion click eliminar producto
function clickEliminarProd() {
    let idE = 0
    let idProducto = document.querySelector("#idEliminarProducto")

    idE = idProducto.value
    let indexE = arrayObjetos.findIndex((producto) => producto.idProducto == idE)
    if (indexE != -1){
        let eliminado = arrayObjetos.splice(indexE,1)
        console.log("El producto: " + eliminado[0].nombre + ", fue eliminado con exito")
        arrayObjetos.forEach((producto, indice) => {
            producto.idProducto = indice + 1
        })
        hidennButonn()
        ListaPantalla()
        almacenarLocal()
    }
}

//funcion esconder botones cuando no hay nada en la lista
function hidennButonn(){

    if (arrayObjetos.length != 0) {
    
        document.getElementById("ulElimina").hidden = false
        document.getElementById("ulMod").hidden = false
    
    }else{
    
        document.getElementById("ulElimina").hidden = true
        document.getElementById("ulMod").hidden = true
    }


}

//function local storage
function almacenarLocal(){

    localStorage.setItem("ListaProductos", JSON.stringify(arrayObjetos))

}