let validar = document.getElementById("validar");
let reiniciar = document.getElementById("reiniciar");
let iniciar = document.getElementById("iniciar");
let numero = document.getElementById("numero");
let niveles = document.getElementById("niveles");
let parrafo = document.getElementById("parrafo");
let tiempoP = document.getElementById("tiempo");
let numeroAleatorio = parseInt(Math.random()*1000+1);
let nombre = document.getElementById("nombre");
let gana = false;
var tiempo = 60000;

console.log(numeroAleatorio);

iniciar.onclick = ()=>{
    console.log(nombre.value);
    console.log(localStorage.getItem(nombre.value));
    for(i = 0; i < localStorage.length; i++){
        console.log(localStorage.key(i));
        console.log(localStorage.getItem(localStorage.key(i)));
    }
    gana = false;
    tiempoP.hidden = false;
    habilitar();
    parrafo.innerText = "Ingresa un numero";
    juego();
    if(niveles.value == 1){
        tiempo = 60000;
    }else if(niveles.value == 2){
        tiempo = 40000;
    }else if(niveles.value == 3){
        tiempo = 30000;
    }
    window.setInterval(function(){
        if(tiempo == 0){
            if(!gana){
                parrafo.innerText = `Perdiste, el número mágico es: ${numeroAleatorio}`;
                validar.disabled = true;
                numero.disabled = true;
                iniciar.disabled = true;
                niveles.disabled = false;
            }
        }else{
            tiempoP.innerHTML = tiempo/1000;
            tiempo -= 1000;
        }
      },1000);
}

const habilitar = () =>{
    validar.disabled = false;
    numero.disabled = false;
    iniciar.disabled = true;
    niveles.disabled = true;
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
                localStorage.setItem(nombre.value, `${tiempo}`);
            }else if(numero.value < numeroAleatorio){
                parrafo.innerText = `El numero es mayor`;
            }else if(numero.value > numeroAleatorio){
                parrafo.innerText = `El numero es menor`;
            }
        }
    }
    
    reiniciar.onclick = ()=>{
        location.reload();
    }
}