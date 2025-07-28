const inicioSection = document.getElementById("inicio-section");
const juegoSection = document.getElementById("juego-section");
const resultadoSection = document.getElementById("resultado-section");
const resultadoDiv = document.getElementById("resultado");
const preguntaTitulo = document.getElementById("pregunta");
const opcionesDiv = document.getElementById("opciones");
const btnStart = document.getElementById("btn-start");
const btnEnviar = document.getElementById("btn-enviar");
const btnReiniciar = document.getElementById("btn-reiniciar");
const contadorDiv = document.getElementById("contador");
const bienvenido = document.getElementById("bienvenido");

const nombreInput = document.getElementById("nombre");
const emailInput = document.getElementById("email");

let puntajeTotal = 0;
let seleccionadas = [];
let preguntaActualIdx = 0;
let tiempoRestante = 15;
let temporizador;
const TOTAL_PREGUNTAS = 5;

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

btnStart.onclick = () => {
  const nombre = nombreInput.value.trim();
  const email = emailInput.value.trim();

  if (nombre === "" || email === "") {
    alert("Por favor, completá tu nombre y correo.");
    return;
  }

  const jugadores = JSON.parse(localStorage.getItem("jugadores") || "[]");
  const yaJugado = jugadores.some(j => j.email === email);
  if (yaJugado) {
    alert("Este correo ya participó. Solo se permite una vez por persona.");
    return;
  }

  jugadores.push({ nombre, email });
  localStorage.setItem("jugadores", JSON.stringify(jugadores));

  bienvenido.innerHTML = `<p class="alert alert-success">¡Hola ${nombre}! Vas a jugar 5 rondas. Seleccioná 3 alimentos en cada una. Tenés 10 segundos para responder. ¡A jugar!</p>`;
  inicioSection.classList.add("d-none");
  juegoSection.classList.remove("d-none");
  mostrarPregunta();
};

function mostrarPregunta() {
  const pregunta = todasLasPreguntas[preguntaActualIdx];
  preguntaTitulo.textContent = pregunta.texto;
  opcionesDiv.innerHTML = "";
  seleccionadas = [];

  pregunta.opciones.forEach((opcion, i) => {
    const btn = document.createElement("button");
    btn.className = "btn btn-lg btn-outline-primary m-2 w-100";
    btn.textContent = opcion.texto;
    btn.dataset.index = i;

    btn.onclick = () => {
      const index = seleccionadas.indexOf(i);
      if (index !== -1) {
        seleccionadas.splice(index, 1);
        btn.classList.remove("active");
      } else if (seleccionadas.length < 3) {
        seleccionadas.push(i);
        btn.classList.add("active");
      } else {
        alert("Solo podés elegir 3 alimentos.");
      }
      btnEnviar.disabled = seleccionadas.length !== 3;
    };

    const col = document.createElement("div");
    col.className = "col-md-4";
    col.appendChild(btn);
    opcionesDiv.appendChild(col);
  });

  btnEnviar.disabled = true;
  iniciarTemporizador();
}

function iniciarTemporizador() {
  tiempoRestante = 15;
  contadorDiv.textContent = `Tiempo restante: ${tiempoRestante}s`;

  temporizador = setInterval(() => {
    tiempoRestante--;
    contadorDiv.textContent = `Tiempo restante: ${tiempoRestante}s`;
    if (tiempoRestante <= 0) {
      clearInterval(temporizador);
      puntajeTotal -= 2;
      pasarSiguiente();
    }
  }, 1000);
}

btnEnviar.onclick = () => {
  clearInterval(temporizador);
  const respuesta = seleccionadas.map(i => todasLasPreguntas[preguntaActualIdx].opciones[i]);
  const puntos = respuesta.reduce((sum, r) => sum + r.puntos, 0);
  puntajeTotal += puntos;
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

function mostrarResultadoFinal() {
  juegoSection.classList.add("d-none");
  resultadoSection.classList.remove("d-none");

  resultadoDiv.innerHTML = `<h3 class="text-success">¡Juego finalizado!</h3>
    <p>Tu puntaje final fue: <strong>${puntajeTotal}</strong> sobre 69.</p>
    ${generarBarraSalud(puntajeTotal)}
    <h4 class="mt-3">${obtenerDescuento(puntajeTotal)}</h4>
    <p class="text-muted">Gracias por participar, ¡seguí eligiendo opciones saludables!</p>`;
}
//detalle para el mensaje y para agregar algo mas visual//
    function generarBarraSalud(puntos) {
  let color = "bg-danger";
  if (puntos > 62) color = "bg-success";
  else if (puntos > 50) color = "bg-warning";
  else if (puntos > 30) color = "bg-orange";
  else if (puntos > 20) color = "bg-secondary";

     const porcentaje = Math.min(100, Math.round((puntos / 69) * 100));
  return `
    <div class="progress mt-3" style="height: 30px;">
      <div class="progress-bar ${color}" role="progressbar" style="width: ${porcentaje}%;">
        Saludable ${porcentaje}%
      </div>
    </div>`;
}

function obtenerDescuento(puntos) {
   if (puntos > 62) return "🎉 ¡Ganaste un 50% de descuento!";
    if (puntos > 40) return "🎉 ¡Ganaste un 25% de descuento!";
     if (puntos > 30) return "🎉 ¡Ganaste un 10% de descuento!";
      if (puntos > 20) return "🎉 ¡Ganaste un cupón de $2500!";
  return "😊 No obtuviste un descuento, ¡pero hiciste un gran esfuerzo!";
}

btnReiniciar.onclick = () => location.reload();
