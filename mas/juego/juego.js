
//Mini trivia de preguntas sobre alimnetacion saludable en el cual enes 15 segundos para responder//
//casi todo el codigo fue optimizado con ia para agregar mostrar o ocultar diferentes classes de bootstrap //
//Si en 15 segundos el usuario no responde se les descuenta puntos//
//una vez terminado este texto se da un resultado obteniendo un puntaje del puntaje del cual sera referencia de los cupones obtenidos

// Obtener todos los elementos del DOM por clase
const inicioSection = document.querySelector(".inicio-section");
const juegoSection = document.querySelector(".juego-section");
const resultadoSection = document.querySelector(".resultado-section");
const resultadoDiv = document.querySelector(".resultado");
const resultadoDescuentoDiv = document.querySelector(".resultado-descuento");
const preguntaTitulo = document.querySelector(".pregunta");
const opcionesDiv = document.querySelector(".opciones");
const btnStart = document.querySelector(".btn-start");
const btnEnviar = document.querySelector(".btn-enviar");
const btnReiniciar = document.querySelector(".btn-reiniciar");
const contadorDiv = document.querySelector(".contador");
const bienvenido = document.querySelector(".bienvenido");

const nombreInput = document.querySelector(".nombre");
const emailInput = document.querySelector(".email");
//variables globales para utilizar//
let puntajeTotal = 0; //acumula el puntaje del jugador
let seleccionadas = []; //array con las preguntas elegidas
let preguntaActualIdx = 0; //actualiza porque tambiern como gana puede ir perdiendo puntos //
let tiempoRestante = 15; //son 15 segundos para responder a las preguntas
let temporizador;
const TOTAL_PREGUNTAS = 5; //solo son 5 preguntas

// Preguntas del juego es un array de objetos 
// cada alimento para elegir ya tene un puntaje asignado -bajo mi criterio-//

const todasLasPreguntas = [
  {
    texto: "¿Qué alimentos elegirías para este desayuno?",
    opciones: [
      { texto: "2 huevos revueltos", puntos: 5 },
      { texto: "tostadas con manteca", puntos: 3 },
      { texto: "café con leche y edulcorante", puntos: 5 },
      { texto: "exprimido de naranja", puntos: 1 },
      { texto: "bizcochos de grasa", puntos: 1 }
    ]
  },
  {
    texto: "¿Qué snacks elegirías en un día de trabajo y entrenamiento?",
    opciones: [
      { texto: "Frutos secos, granola", puntos: 5 },
      { texto: "1 Fruta a elección", puntos: 5 },
      { texto: "Sanguchito de jamón y queso", puntos: 3 },
      { texto: "1 lata de energizante", puntos: 3 },
      { texto: "Alfajor triple", puntos: 1 }
    ]
  },
  {
    texto: "¿Qué merienda saludable elegirías?",
    opciones: [
      { texto: "Yogurt natural con granola", puntos: 5 },
      { texto: "1 Fruta a elección", puntos: 5 },
      { texto: "Tostada integral con huevo", puntos: 5 },
      { texto: "Pan con queso y mermelada", puntos: 1 },
      { texto: "Porción de pastaflora", puntos: 1 }
    ]
  },
  {
    texto: "¿Qué cena baja en carbohidratos preferís?",
    opciones: [
      { texto: "Pechuga de pollo con verduras", puntos: 5 },
      { texto: "Revuelto de huevo, ricota y espinaca", puntos: 5 },
      { texto: "Ensalada con legumbres y queso", puntos: 3 },
      { texto: "Ensalada de lechuga y tomate", puntos: 1 },
      { texto: "Pastas con bolognesa", puntos: 1 }
    ]
  },
  {
    texto: "¿Qué elegirías en una reunión social?",
    opciones: [
      { texto: "Sanguchitos de carne", puntos: 5 },
      { texto: "Picada equilibrada", puntos: 5 },
      { texto: "Bebida sin azúcar + 1 porción pizza", puntos: 5 },
      { texto: "Snacks salados", puntos: 1 },
      { texto: "Cerveza", puntos: 1 }
    ]
  }
];

// Iniciar juego// boton de iniciar juego
//se verifica que se haya ingresado nombre y correo
  //antes de subir a la web de nuevo use esto para eliminar los mails utilizados y  para que prueben el juego algun amigo que yo ya habia usados sus mails y estan guardados//
  //  localStorage.clear(); utilice esta funcion 1 vez para limpiar el storage y luego actualizo en github //
btnStart.onclick = () => { 
  const nombre = nombreInput.value.trim();
  const email = emailInput.value.trim();

  if (nombre === "" || email ===  "") {
    alert("Por favor, completá tu nombre y correo.");
    return;
  }

  const jugadores = JSON.parse(localStorage.getItem("jugadores") || "[]"); 

  const yaJugado = jugadores.some(j => j.email === email);
  if (yaJugado) {
    alert("Este correo ya participó. Solo se permite una vez por persona.");
    return;
  }

  jugadores.push({ nombre, email }); // guarda el email sin codificar
  localStorage.setItem("jugadores", JSON.stringify(jugadores));

  bienvenido.innerHTML = `<p class="alert alert-success">¡Hola ${nombre}! Vas a jugar 5 rondas. Seleccioná 3 alimentos en cada una. Tenés 10 segundos para responder. ¡A jugar!</p>`;
  document.querySelector('.introContainer').classList.add("d-none");
  juegoSection.classList.remove("d-none");

  mostrarPregunta();
};


function mostrarPregunta() { //ESta funcion genera los botones de opciones y permite selecionar hasta 3 //
  const pregunta = todasLasPreguntas[preguntaActualIdx];
  preguntaTitulo.textContent = pregunta.texto;
  opcionesDiv.innerHTML = "";
  seleccionadas = [];

  pregunta.opciones.forEach((opcion, i) => {  // recorre las opciones y crea botones para cada una.
    const btn = document.createElement("button"); 
    btn.className = "btn btn-lg btn-outline-primary m-2 w-100";
    btn.textContent = opcion.texto;
    btn.dataset.index = i; //guarda el índice de cada opción para saber cuál fue seleccionada

    btn.onclick = () => {
      const index = seleccionadas.indexOf(i);
      if (index !== -1) {
        seleccionadas.splice(index, 1);
        btn.classList.remove("active");
      } else if (seleccionadas.length < 3) {
        seleccionadas.push(i);
        btn.classList.add("active");
      } else {
        alert("Solo podés elegir 3 alimentos."); //si el suuairo quiere elegir mas de 3 elementos tira un alert
      }
      btnEnviar.disabled = seleccionadas.length !== 3;
    };

    const col = document.createElement("div");
    col.className = "col-md-4";
    col.appendChild(btn);
    opcionesDiv.appendChild(col);
  });

  btnEnviar.disabled = true;
  iniciarTemporizador();    //temporizador de 15 seg por pregunta// si llega al 0 resta puntos y pasa a la siguiente preugnta//
}

function iniciarTemporizador() {
  tiempoRestante = 15;
  contadorDiv.textContent = `Tiempo restante: ${tiempoRestante}s`;

  temporizador = setInterval(() => {
    tiempoRestante--;
    contadorDiv.textContent = `Tiempo restante: ${tiempoRestante}s`;
    if (tiempoRestante <= 0) { //si llega al 0 resta puntos y pasa a la siguiente pregunta//
      clearInterval(temporizador); //detiene el temporizador si se responde a tiempo.
      puntajeTotal -= 2; //esa es la "penalizacion" por no responder a tiempo
      pasarSiguiente();
    }
  }, 1000);
}

btnEnviar.onclick = () => { //suma el puntaje de los alimentos /opciones elegidas y avanza //
  clearInterval(temporizador);
  const respuesta = seleccionadas.map(i => todasLasPreguntas[preguntaActualIdx].opciones[i]); 
  //Este es buenisimo, transforma los índices seleccionados en objetos de opción./
  //hace que los indices se convierten  en los objetos de opción completos, accediendo a la pregunta actual (preguntaActualIdx) en el array todasLasPreguntas, y luego a las opciones de esa pregunta.
  const puntos = respuesta.reduce((sum, r) => sum + r.puntos, 0); //Suma todos los puntos de las opciones seleccionadas.
  puntajeTotal += puntos; // actualiza el puntaje global.
  pasarSiguiente();
};

function pasarSiguiente() {
  preguntaActualIdx++;
  if (preguntaActualIdx < TOTAL_PREGUNTAS) {
    mostrarPregunta();
  } else {
    mostrarResultadoFinal();
  }
}

function mostrarResultadoFinal() { //mostrar secciones de resultado final// 
  juegoSection.classList.add("d-none");
  resultadoSection.classList.remove("d-none");

  resultadoDiv.innerHTML = `
    <h3 class="text-success">¡Juego finalizado!</h3>
    <p>Tu puntaje final fue: <strong>${puntajeTotal}</strong> sobre 69.</p>
    ${generarBarraSalud(puntajeTotal)}
    <p class="text-muted">Gracias por participar, ¡seguí eligiendo opciones saludables!</p>`;

  resultadoDescuentoDiv.innerHTML = obtenerDescuento(puntajeTotal);
}
// con ia me genero una "barra de salud" bastante moderna y responsive para mostrar el puntaje del jugador
// y un descuento dependiendo del puntaje obtenido//
function generarBarraSalud(puntos) {
  let color = "bg-danger";
  if (puntos > 62) color = "bg-success";
  else if (puntos > 50) color = "bg-warning";
  else if (puntos > 30) color = "bg-orange";
  else if (puntos > 20) color = "bg-secondary";

  const porcentaje = Math.min(100, Math.round((puntos / 69) * 100));
  return `
    <div class="progress mt-3" style="height: 30px;">
      <div class="progress-bar ${color}" role="progressbar" style="width: ${porcentaje}%; ">
        Saludable ${porcentaje}%
      </div>
    </div>`;
}
//FINALMENTE ACA ES UNA IDEA QUE TENIA HACE MUCHO TIEMPO, ESTA DEVOLVIENDO CODIGO HTML Y LAS IMAGEENS CON LOS CUPONES DE DESCUENTO
////con IA lo pude organizar mejor para poder leer, y que automatice todas las classes de bootstrap que yo le pedia para seguir ciertos estilos//
function obtenerDescuento(puntos) {
  if (puntos > 62)
    return `
      <div class="descuento d-flex flex-column align-items-center justify-content-center text-center my-4">
        <p>🎉 ¡Ganaste un 50% de descuento!</p>
        <img src="img/descuento50.jpg" alt="Cupón 50%" width="150">
      </div>`;
  if (puntos > 40)
    return `
      <div class="descuento d-flex flex-column align-items-center justify-content-center text-center my-4">
        <p>🎉 ¡Ganaste un 25% de descuento!</p>
        <img src="img/descuento25.jpg" alt="Cupón 25%" width="150">
      </div>`;
  if (puntos > 30)
    return `
      <div class="descuento d-flex flex-column align-items-center justify-content-center text-center my-4">
        <p>🎉 ¡Ganaste un 10% de descuento!</p>
        <img src="img/descuento10.jpg" alt="Cupón 10%" width="150">
      </div>`;
  if (puntos > 20)
    return `
      <div class="descuento d-flex flex-column align-items-center justify-content-center text-center my-4">
        <p>🎉 ¡Ganaste un cupón de $2500!</p>
        <img src="img/descuentocash.jpg" alt="Cupón $2500" width="150">
      </div>`;
  return `<p class="text-center my-4">😊 No obtuviste un descuento, ¡pero hiciste un gran esfuerzo!</p>`;
}

// Obtener un valor


// Reiniciar juego
btnReiniciar.onclick = () => location.reload();
