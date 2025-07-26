
///script para el juego// 

// Elementos  
const inicioDiv = document.getElementById('inicio');  
const juegoDiv = document.getElementById('juego');  

const seccionDesayuno = document.getElementById('seccion-desayuno');  
const seccionAlmuerzo = document.getElementById('seccion-almuerzo');  
const seccionCena = document.getElementById('seccion-cena');  
const resultadoDiv = document.getElementById('resultado');  

const btnComenzar = document.getElementById('btn-comenzar');  
const btnContinuarDesayuno = document.getElementById('btn-continuar-desayuno');  
const btnContinuarAlmuerzo = document.getElementById('btn-continuar-almuerzo');  
const btnFinalizar = document.getElementById('btn-finalizar');  

// Variables para guardar datos  
let desayuno = [];  
let almuerzo = [];  
let cena = [];  
let usuario = '';  

// Evento para comenzar  
btnComenzar.onclick = () => {  
  usuario = document.getElementById('nombre-usuario').value.trim();  
  if (usuario === '') {  
    alert('Por favor ingresa tu nombre');  
    return;  
  }  
  inicioDiv.classList.add('d-none');  
  juegoDiv.classList.remove('d-none');  

  // Mostrar desayuno  
  seccionDesayuno.classList.remove('d-none');  
};  

// Cuando el usuario guarda el desayuno  
btnContinuarDesayuno.onclick = () => {}
  // Aquí guardas qué alimentos eligió en desayuno (esto es ejemplo)  
  // desayuno = ... (obtienes de los elementos