
  document.addEventListener("DOMContentLoaded", function () {
    const form = document.getElementById("formulario-contacto");
    const nombre = document.getElementById("nombre");
    const email = document.getElementById("email");
    const mensaje = document.getElementById("mensaje");

    form.addEventListener("submit", function (e) {
      e.preventDefault();

      if (!nombre.value || !email.value || !mensaje.value) {
        alert("Por favor, completá todos los campos.");
        return;
      }

      // Crear los datos del formulario
      const formData = new FormData(form);
      formData.append("_captcha", "false");
      formData.append("_subject", "Nuevo mensaje desde el sitio web");

      // Enviar usando fetch
      fetch("https://formsubmit.co/delalaura98@gmail.com", {
        method: "POST",
        body: formData
      })
      .then(response => {
        if (response.ok) {
          form.reset();
          mostrarMensajeGracias();
        } else {
          alert("Ocurrió un error al enviar el mensaje.");
        }
      })
      .catch(error => {
        console.error("Error:", error);
        alert("Ocurrió un error al enviar el mensaje.");
      });
    });

    function mostrarMensajeGracias() {
      const mensajeHTML = `
        <div class="alert alert-success mt-4" role="alert">
          ¡Gracias por tu mensaje! Te responderemos pronto.
        </div>
      `;
      form.insertAdjacentHTML("afterend", mensajeHTML);
    }
  });

