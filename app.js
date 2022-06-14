//SUMA TOTAL DE PRODUCTOS QUE QUIERA EL USUARIO EN UNA COMPRA MAYORISTA
console.log("Carrito de compras")

//Declaro variables
let fin = 1
let total = 0
let PrimerProducto = 1
let ConcatProduct = ""
let ConcatProduct2 = ""
let producto = ""
let valor = 0
let cantidad = 0
let arrayObjetos = []
while (fin == 1) {

    // Usuario ingresa el nombre del producto, ej: "Camisa"
    producto = prompt("Ingrese nombre del producto")
    while (producto == "" || producto == undefined) {

        producto = prompt("Ingrese nombre del producto")

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
    console.log("Producto ingresado: " + producto)
    console.log("Valor de cada " + producto + " : " + valor + "$")
    console.log("Cantidad ingresada: " + cantidad)
    // Declaro el objeto "compra", en donde se guardan los datos anteriormente ingresados
    const compra = {
        producto: producto,
        valor: valor,
        cantidad: cantidad
    }
    //Push al array cada compra realizada
    arrayObjetos.push(compra)
    // ForEach utilizado para ver el total de los productos segun corresponda
    arrayObjetos.forEach((compra, indice) => {

        total = total + ((compra.cantidad) * (compra.valor))
        //total = (compra.cantidad * compra.valor) 
        ConcatProduct = `${indice == 0 ? compra.producto : ConcatProduct + `${indice == arrayObjetos.length - 1 ? " y " : ", "}` + compra.producto}`
        console.log(`El monto total sumando ${arrayObjetos.length>1?"los productos":"el producto"}: ${ConcatProduct}. Es de: $${total}`)
    })


    // Bucle para preguntarle al usuario si desea seguir ingresando productos
    while (true) {

        let consulta = prompt("Desea sumar algun otro producto. (S/N)")
        if (consulta == "N" || consulta == "n") {

            fin = 2
            break
        } else if (!(consulta == "S") && !(consulta == "s")) {

            console.log("Por favor ingerse un caracter valido. (S/N)")

        } else {

            PrimerProducto = 2
            break
        }

    }
}