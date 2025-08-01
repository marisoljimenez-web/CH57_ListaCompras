const txtName = document.getElementById("Name");
const txtNumber = document.getElementById("Number");
const btnAgregar = document.getElementById("btnAgregar");
const btnClear = document.getElementById("btnClear");
const alertValidaciones = document.getElementById("alertValidaciones");
const alertValidacionesTexto = document.getElementById("alertValidacionesTexto");
const tablaListaCompras = document.getElementById("tablaListaCompras");
const cuerpoTabla = tablaListaCompras.getElementsByTagName("tbody").item(0);

const contadorProductos =document.getElementById("contadorProductos");
const precioTotal = document.getElementById("precioTotal");
const productosTotal = document.getElementById("productosTotal");


let contador = 0;
let costoTotal = 0;
let totalEnProductos = 0;

let datos = new Array(); //[]


function validarCantidad(){
    if(txtNumber.value.length==0){
        return false;
    } //Tenga información

    if(isNaN(txtNumber.value)){
        return false;
    } //Tiene que ser un número

    if(Number(txtNumber.value)<=0){
        return false;
    }//Tiene que ser mayor a 0

    return true;
} //Validad cantidad

function getPrecio(){
    return Math.round(Math.random() * 10000) /100;
} //get precio

btnAgregar.addEventListener("click", function(event){
    event.preventDefault();
    let isValid = true;
    alertValidacionesTexto.innerHTML="";
    alertValidaciones.style.display="none";
    txtName.style.border="";
    txtNumber.style.border="";

    //Name
    //Validar que tenga información mínimo 3 letras
    if(txtName.value.length<3){
        txtName.style.border="medium red solid";
        alertValidacionesTexto.innerHTML="<strong>El nombre del producto no es válido</strong>";
        alertValidaciones.style.display="block";
        isValid = false;
    } //<3

    
    //Number
    //Que tenga información
    

    if(! validarCantidad()){
        txtNumber.style.border="medium red solid";
        alertValidacionesTexto.innerHTML += "<strong>La cantidad no es correcta</strong>";
        alertValidaciones.style.display="block";
        isValid = false;
    }

    if(isValid){
        contador++;
        let precio = getPrecio();
        let row = `<tr>
            <td>${contador}</td>
            <td>${txtName.value}</td>
            <td>${txtNumber.value}</td>
            <td>${precio}</td>
        </tr>`;
        let elemento = {
            "contador" : contador,
            "nombre" : txtName.value,
            "cantidad" :txtNumber.value,
            "precio" : precio
        };
        datos.push(elemento);
        localStorage.setItem("datos", JSON.stringify(datos));

        cuerpoTabla.insertAdjacentHTML("beforeend", row);
        contadorProductos.innerHTML=contador;
        totalEnProductos += Number(txtNumber.value);
        productosTotal.innertext = totalEnProductos;
        costoTotal += precio * Number(txtNumber.value);
        //costoTotal.toFixed(2) para establecer dos decimales, forma fácil
        precioTotal.innerText = new Intl.NumberFormat("es-MX", 
                    { style: "currency", currency: "MXN" }).format(costoTotal);


        let resumen = {
            "contador" : contador,
            "totalEnProductos" : totalEnProductos,
            "costoTotal" : costoTotal
        };

        localStorage.setItem("resumen", JSON.stringify(resumen) );



        txtName.value="";
        txtNumber.value="";
        txtName.focus();
    }//is valid
});

