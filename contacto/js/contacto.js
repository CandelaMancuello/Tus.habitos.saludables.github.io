
//Script de formulario de contacto // 

  document.addEventListener("DOMContentLoaded", function () {
    const form = document.querySelector("form");

    form.addEventListener("submit", function (e) {
      const nombre = document.getElementById("nombre").value;
      const email = document.getElementById("email").value;
      const mensaje = document.getElementById("mensaje").value;

      if (!nombre || !email || !mensaje) {
        e.preventDefault();
        alert("Por favor, completá todos los campos.");
      }
    });
  });

