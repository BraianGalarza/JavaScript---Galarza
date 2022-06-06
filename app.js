
console.log("Suma - Resta - Multiplicación - División")

let fin = 1

while (fin == 1){

    let resultado = 0
    let comprob = 1
    let Num = +prompt("Ingrese un Número")
    let Operacion = prompt("Ingrese una Operación (+ - * /)")
    let Num2 = +prompt("Ingrese un Segundo Número")

    if (Operacion ==  "+") {

        resultado = Num + Num2
        comprob = 2

    }
    else if(Operacion ==  "-") {

        resultado = Num - Num2
        comprob = 2

    }
    else if(Operacion ==  "/") {

        resultado = Num / Num2
        comprob = 2

    }
    else if(Operacion ==  "*") {

        resultado = Num * Num2
        comprob = 2

    }


    if (comprob == 2) {

        if (isNaN(resultado)){
            console.log("Por favor ingrese numeros validos. Vuelva a intentar.")
        }
        else {

            console.log("El resultado es: " + resultado)

            while (true){
    
                let consulta = prompt("Desea hacer alguna otra operacion. (S/N)")
                if (consulta == "N" || consulta == "n" ){
                    fin = 2
                    break
                }
                else if (!(consulta == "S") && !(consulta == "s")){
                    
                    console.log("Por favor ingerse un caracter valido. (S/N)")
                
                }
                else{
                    break
                }
        
            }
        }
    }
    else {
        console.log("Por favor ingrese una operación valida. Vuelva a intentar.")
    }




}