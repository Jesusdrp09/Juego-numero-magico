let validar = document.getElementById("validar");
let reiniciar = document.getElementById("reiniciar");
let iniciar = document.getElementById("iniciar");
let numero = document.getElementById("numero");
let niveles = document.getElementById("niveles");
let parrafo = document.getElementById("parrafo");
let tiempoP = document.getElementById("tiempo");
let nombre = document.getElementById("nombre");
let calificaciones = document.getElementById("calificaciones");
let regresar = document.getElementById("regresar");
let contenedor = document.getElementById("contenedor");
let puntajes = document.getElementById("puntajes");
let filas = document.getElementById("filas");
let numeroAleatorio = generarNumero();
let gana = false;
var tiempo = 60000;

iniciar.onclick = ()=>{
    if(nombre.value != ""){
        nombre.setAttribute("style", "border: 0;");
        habilitar();
        juego();
        tiempo = nivel();
        parrafo.innerText = "Ingresa un numero";
        window.setInterval(function(){
            if(tiempo == 0){
                if(!gana){
                    parrafo.innerText = `Perdiste, el número mágico es: ${numeroAleatorio}`;
                    validar.disabled = true;
                    numero.disabled = true;
                    niveles.disabled = true;
                }
            }else{
                if(!gana){
                    tiempoP.innerHTML = tiempo/1000;
                    tiempo -= 1000;
                }
            }
          },1000);
    }else{
        nombre.setAttribute("style", "border: 2px solid red;");
        alert("Por favor ingresar el nombre");
    }
}

calificaciones.onclick = ()=>{
    contenedor.setAttribute("hidden", "");
    puntajes.removeAttribute("hidden");
    for(i = 0; i < localStorage.length; i++){
        let fila = document.createElement("tr");
        let nombre = document.createElement("td");
        let puntaje = document.createElement("td");
        nombre.innerText = localStorage.key(i);
        puntaje.innerText = localStorage.getItem(localStorage.key(i));
        fila.appendChild(nombre);
        fila.appendChild(puntaje);
        filas.appendChild(fila);
    }
}

regresar.onclick = ()=>{
    let hijos = filas.children;
    for(i = 0; i < hijos.length; i++){
        filas.removeChild(hijos.item(i));
    }
    puntajes.setAttribute("hidden","");
    contenedor.removeAttribute("hidden");
}

const nivel = () =>{
    if(niveles.value == 1){
        return 60000;
    }else if(niveles.value == 2){
        return 40000;
    }else if(niveles.value == 3){
        return 30000;
    }
}

function generarNumero (){
    let min = 1, max = 1000; 
    return parseInt(Math.random()*max+min);
}

const habilitar = () =>{
    validar.disabled = false;
    numero.disabled = false;
    iniciar.disabled = true;
    niveles.disabled = true;
    nombre.disabled = true;
    tiempoP.hidden = false;
    gana = false;
}

function juego() {
    validar.onclick = ()=>{
        esIgual(gana);
    }
    
    numero.onkeypress = (e)=>{
        if(e.keyCode == 13){
            esIgual(gana);
        }
    }
    
    const esIgual = (gana)=>{
        if(!gana){
            if(numero.value == numeroAleatorio){
                parrafo.innerText = "Ganaste";
                gana = true;
                validar.disabled = true;
                numero.disabled = true;
                iniciar.disabled = true;
                niveles.disabled = true;
                tiempoP.hidden = true;
                console.log();
                if(localStorage.getItem(nombre.value) != null){
                    if(localStorage.getItem(nombre.value).replace("s", "") > (nivel() - tiempo)/1000){
                        localStorage.setItem(nombre.value, `${(nivel() - tiempo)/1000}s`);
                    }
                }else{
                    localStorage.setItem(nombre.value, `${(nivel() - tiempo)/1000}s`);
                }
            }else if(numero.value < numeroAleatorio){
                parrafo.innerText = `El numero es mayor`;
            }else if(numero.value > numeroAleatorio){
                parrafo.innerText = `El numero es menor`;
            }
        }
    }
}

reiniciar.onclick = ()=>{
    location.reload();
}

