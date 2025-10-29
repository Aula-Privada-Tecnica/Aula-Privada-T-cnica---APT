// 🟦 Menú toggle
function toggleMenu() {
  const menuBtn = document.getElementById("menuToggle");
  const menu = document.getElementById("menu");

  const isHidden = menu.classList.contains("oculto");

  if (isHidden) {
    menu.classList.remove("oculto");
    menuBtn.textContent = "✖";
  } else {
    menu.classList.add("oculto");
    menuBtn.textContent = "☰";
  }
}

// 🟨 Abrir modal con animación
function abrirModal(id) {
  const modal = document.getElementById(id);
  if (!modal) return;

  modal.classList.remove("oculto");

  const contenido = modal.querySelector(".modal-contenido, .contenido-modal");
  if (contenido) {
    contenido.style.animation = "aparecer 0.4s forwards";
  }
}

// 🟥 Cerrar modal con animación y limpieza
function cerrarModal(id) {
  const modal = document.getElementById(id);
  if (!modal) return;

  const contenido = modal.querySelector(".modal-contenido, .contenido-modal");
  if (contenido) {
    contenido.style.animation = "desaparecer 0.3s forwards";
    setTimeout(() => {
      modal.classList.add("oculto");

      // Limpieza específica para el CLUB
      if (id === "clubModal") {
        const pinInput = document.getElementById("pinClub");
        const resultado = document.getElementById("resultadoClub");
        if (pinInput) pinInput.value = "";
        if (resultado) resultado.innerText = "";
      }

      // Limpieza específica para el FORMULARIO
      if (id === "formularioModal") {
        const formulario = document.getElementById("formularioRegistro");
        if (formulario) formulario.reset();
      }
    }, 300);
  } else {
    modal.classList.add("oculto");
  }
}

// 🧠 Validación de formulario de registro
function validarFormulario() {
  const fechaInicio = new Date(document.getElementById("fechaInicio").value);
  const fechaMinima = new Date("2026-02-03");

  if (fechaInicio <= fechaMinima) {
    alert("La fecha de inicio debe ser posterior al 2 de febrero de 2026.");
    return false;
  }

  const nombre = document.getElementById("nombre").value.trim();
  const apellido = document.getElementById("apellido").value.trim();
  const mes = document.getElementById("mesNacimiento").value.padStart(2, '0');
  const dia = document.getElementById("diaNacimiento").value.padStart(2, '0');

  const codigo = `${nombre[0] || 'X'}${apellido[0] || 'X'}-${mes}${dia}-${Math.floor(Math.random() * 900 + 100)}`;
  alert(`Formulario enviado correctamente.\nTu código estudiantil es: ${codigo}`);

  cerrarModal("formularioModal");
  return false;
}

// 🧠 Validación de PIN del CLUB
function validarPin() {
  const pin = document.getElementById("pinClub").value.trim();
  const resultado = document.getElementById("resultadoClub");

  if (pin.length !== 12) {
    resultado.innerText = "❌ El PIN debe tener exactamente 12 dígitos.";
    return;
  }

  if (estudiantesClub.hasOwnProperty(pin)) {
    const estudiante = estudiantesClub[pin];
    resultado.innerText = `✅ Bienvenido ${estudiante.nombre} ${estudiante.apellido}. Acceso concedido al área de estudiantes.`;
  } else {
    resultado.innerText = "❌ PIN incorrecto. Acceso denegado.";
  }
}

// 🗂 Base de datos simulada
const estudiantesClub = {
  "123456789012": { nombre: "Juan", apellido: "Pérez" },
  "987654321098": { nombre: "María", apellido: "González" },
  "456789123456": { nombre: "Luis", apellido: "Ramírez" },
};

// 🎯 Mostrar botón CLUB manualmente
function mostrarBotonClub() {
  document.getElementById("seccionClubes").classList.remove("oculto");
}
