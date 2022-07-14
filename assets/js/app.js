//SUMA TOTAL DE PRODUCTOS QUE QUIERA EL USUARIO EN UNA COMPRA MAYORISTA


//Variables
let total = 0

//trae lista del local storage
const arrayObjetos = JSON.parse(localStorage.getItem("ListaProductos"))


if (arrayObjetos == undefined || arrayObjetos == ""){
    //esconde botones de modificacion al iniciar 
    document.getElementById("ulElimina").hidden = true
    document.getElementById("ulMod").hidden = true
}else{
    //si hay objetos en el array muestra los botones y la lista de productos
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

let botonChistes = document.getElementById("btnChistes")
botonChistes.addEventListener("click", clickbotonChistes)


//Funciones


function ingreso_Objeto_A_Array(producto) {
    //Push al array cada compra realizada
    arrayObjetos.push(producto)            

}

//funcion para tomar los datos del imput producto
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
        //si no cumple los requisitos no agrega el producto
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

//funcion click chistes
//momentaneo porque no se me ocurria que poner
function clickbotonChistes(){
    fetch("https://api.chucknorris.io/jokes/random")
        .then((resp) => resp.json())
        .then((data) => {
            // console.log(data)
            Toastify({
                text: data.value,
                duration: 10000,
                gravity: "top",
                position: "left",
                style: {
                  background: "linear-gradient(to right, #2C3639, #3F4E4F)",
                },
              }).showToast();
        } )
    
}

//funcion click agregar producto
function clickAgregarProd(){
    const producto = pedirDatos()
    if (producto != undefined){
        ingreso_Objeto_A_Array(producto)  
        hidennButonn()
        ListaPantalla()
        almacenarLocal()
        Toastify({
            text: "El Producto se agrego correctamente!",
            duration: 2500,
            gravity: "top",
            position: "left",
            style: {
              background: "linear-gradient(to right, #2C3639, #3F4E4F)",
            },
          }).showToast();
    }

}

//funcion click modificar producto
function clickModProd(){
    //inicializo variables
    let nombre = ""
    let valor = 0
    let cantidad = 0
    //traigo los datos de los imput mod y guardo los valores en las variables
    let nombreProducto = document.querySelector("#nombreModProducto")
    let valorProducto = document.querySelector("#valorModProducto")
    let cantidadProducto = document.querySelector("#cantidadModProducto")
    nombre = nombreProducto.value
    valor = valorProducto.value
    cantidad = cantidadProducto.value


    let idM = 0
    let idProducto = document.querySelector("#idModProducto")
    idM = idProducto.value

    //reseteo los imput
    idProducto.value = ""
    nombreProducto.value = ""
    valorProducto.value = ""
    cantidadProducto.value = ""

    //recorro el array en busca del id ingresado
    let indexM = arrayObjetos.findIndex((producto) => producto.idProducto == idM)

    if (indexM != -1){
        //si encuentra el id agrega los datos ingresados
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
        ListaPantalla()
        almacenarLocal()
        Toastify({
            text: "El Producto se modifico correctamente!",
            duration: 2500,
            gravity: "top",
            position: "left",
            style: {
              background: "linear-gradient(to right, #2C3639, #3F4E4F)",
            },
          }).showToast();
    }

}

//funcion impime lista en pantalla
function ListaPantalla() {
    //traido los elementos del contenedor y lo vacio
    let contenedor = document.getElementById("contenedor")
    contenedor.innerHTML = ""
    total = 0
    //recorro el array sumando el total y creando la lista de objetos implementando DOM
    for (const producto of arrayObjetos){
        total = total + ((producto.cantidad) * (producto.valor))
        const div = document.createElement("div")
        const ul = document.createElement("ul")
        const id = document.createElement("p")
        const li1= document.createElement("li")
        const li2= document.createElement("li")
        const li3= document.createElement("li")
        
        id.innerText=  `ID: ${producto.idProducto}`
        li1.innerText= `Producto: ${producto.nombre}`
        li2.innerText= `Valor: ${producto.valor}`
        li3.innerText= `Cantidad: ${producto.cantidad}`

        ul.appendChild(li1)
        ul.appendChild(li2)
        ul.appendChild(li3)
        contenedor.appendChild(div).appendChild(id)
        contenedor.appendChild(div).appendChild(ul)
    }
    let parrafo = document.createElement("h2")
    parrafo.innerText = `Monto total de la compra: $${total}`
    let contenedor_monto = document.getElementById("contenedor_monto")
    contenedor_monto.innerHTML = ""
    contenedor_monto.append(parrafo)
}

//funcion click eliminar producto
function clickEliminarProd() {
    let idE = 0
    //tomo el id ingresado y guardo el valor en una variable
    let idProducto = document.querySelector("#idEliminarProducto")
    idE = idProducto.value
    //busco el id en el array
    let indexE = arrayObjetos.findIndex((producto) => producto.idProducto == idE)
    if (indexE != -1){
        //si encuentro el id lo elimino
        let eliminado = arrayObjetos.splice(indexE,1)
        console.log("El producto: " + eliminado[0].nombre + ", fue eliminado con exito")
        arrayObjetos.forEach((producto, indice) => {
            producto.idProducto = indice + 1
        })
        idProducto.value = ""
        ListaPantalla()
        hidennButonn()
        almacenarLocal()
        Toastify({
            text: "El Producto se elimino correctamente!",
            duration: 2500,
            gravity: "top",
            position: "left",
            style: {
              background: "linear-gradient(to right, #2C3639, #3F4E4F)",
            },
          }).showToast();
    }
}

//funcion esconder botones cuando no hay nada en la lista
function hidennButonn(){

    if (arrayObjetos.length != 0) {
        //si hay objetos en el array, muestro los botones
        document.getElementById("ulElimina").hidden = false
        document.getElementById("ulMod").hidden = false
    
    }else{
        //si no hay objetos en el array, escondo los botones y vacio el contenedor del monto
        document.getElementById("ulElimina").hidden = true
        document.getElementById("ulMod").hidden = true
        let contenedor_monto = document.getElementById("contenedor_monto")
        contenedor_monto.innerHTML = ""
    }


}

//function local storage
function almacenarLocal(){
    //guardo la lista como JSON en el local storage
    localStorage.setItem("ListaProductos", JSON.stringify(arrayObjetos))

}