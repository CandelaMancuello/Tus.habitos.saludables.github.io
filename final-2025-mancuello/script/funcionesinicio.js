function calcularDias(fechaReferencia) {
    const fechaRef = new Date(fechaReferencia); // Fecha publicacion
    const hoy = new Date(); // Fecha actual

    // Calcular la diferencia en días
    const diferencia = Math.floor((hoy - fechaRef) / (1000 * 60 * 60 * 24));
    return diferencia + "d";
}

// Fechas de publicacion
const fechaBase1 = "2025-01-25"; 
const fechaBase2 = "2025-02-03"; 


// Asignar valores dinámicamente
document.getElementById("date1").textContent = calcularDias(fechaBase1);
document.getElementById("date2").textContent = calcularDias(fechaBase2);

