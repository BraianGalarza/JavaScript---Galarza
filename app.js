//SUMA TOTAL DE PRODUCTOS QUE QUIERA EL USUARIO EN UNA COMPRA MAYORISTA
console.log("Carrito de compras")

//Variables
const arrayObjetos = []
let menuOpcion = 0
let total = 0
do{
    //If para mostrar el menu si hay datos en el array
    if (arrayObjetos.length == 0){
        console.log("Menú de opciones")
        console.log("1. Agregar producto")
        console.log("0. Salir")
        menuOpcion = +prompt("Ingrese un numero")
        if (menuOpcion == 1){

            const producto = pedirDatos()
            ingreso_Objeto_A_Array(producto)       
            
        }
    }else{
        //Menu de opciones para cuando el array tenga datos
        console.log("Menú de opciones")
        console.log("1. Agregar producto")
        console.log("2. Modificar producto")
        console.log("3. Eliminar producto")
        console.log("4. Lista de producto/s")
        console.log("5. Imprimir lista en pantalla y salir")
        console.log("0. Salir")
        menuOpcion = +prompt("Ingrese un numero")
        //Switch utilizado para realizar la accion que ingreso el usuario
        switch(menuOpcion){
            case 1:
                const producto = pedirDatos()
                ingreso_Objeto_A_Array(producto)
                break
            case 2:
                let modificacionOpcion = 0
                console.log("Cual producto desea modificar?")
                for(const producto of arrayObjetos){
                    console.log(producto.idProducto + ". Producto: " + producto.nombre + ", valor: " + producto.valor + " y cantidad: " + producto.cantidad)
                }
                let idM = +prompt("Ingrese numero del producto")
                console.log("Opciones a modificar")
                console.log("1. Nombre del producto")
                console.log("2. Valor del producto")
                console.log("3. Cantidad del producto")
                console.log("0. Salir")
                modificacionOpcion = +prompt("Ingrese un numero según la opción a modificar")
                let indexM = arrayObjetos.findIndex((producto) => producto.idProducto == idM)
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
                break
            case 3:
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
                    break
                } else {
                    console.log("Nombre de producto invalido, por favor vuelva a intentar.")
                }
                break
            case 4:
                total = 0
                arrayObjetos.forEach((producto, indice) => {
                    total = total + ((producto.cantidad) * (producto.valor))
                    ConcatProduct = `${indice == 0 ? producto.nombre : ConcatProduct + `${indice == arrayObjetos.length - 1 ? " y " : ", "}` + producto.nombre}`
                })
                console.log(`El monto total sumando ${arrayObjetos.length>1?"los productos":"el producto"}: ${ConcatProduct}. Es de: $${total}`)
                break
            case 5:
                total = 0
                for (const producto of arrayObjetos){
                    total = total + ((producto.cantidad) * (producto.valor))
                    let contenedor = document.createElement("div")
                    contenedor.innerHTML = `<ul> ID: ${producto.idProducto}</ul><li> Producto: ${producto.nombre}</li><li> Cantidad: ${producto.cantidad}</li><li>Valor: $${producto.valor}</li>`
                    document.body.appendChild(contenedor)
                }
                let parrafo = document.createElement("p")
                parrafo.innerHTML = `<h2>Monto total de la compra: $${total}</h2>`
                document.body.append(parrafo)
                menuOpcion = 0
                break
        }
    }
}while(menuOpcion!=0)

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