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
    const pinInput = document.getElementById('pinClub');
    const resultado = document.getElementById('resultadoClub');
    const pin = pinInput.value.trim(); 
    
    // Función para aplicar estilos base (solo color y padding)
    const aplicarEstilosBase = (color) => {
        resultado.style.color = color; // Color de texto solicitado o de éxito/error
        resultado.style.padding = '1vh'; // PADDING solicitado
        // *Quitamos cualquier otro estilo de fondo o borde que no fue solicitado*
        resultado.style.backgroundColor = 'transparent'; 
        resultado.style.border = 'none';
        resultado.style.borderRadius = '0';
    };

    // 1. VALIDACIÓN DE LONGITUD DEL PIN (APLICACIÓN DE ESTILOS EXACTOS SOLICITADOS)
    if (pin.length !== 12) {
        resultado.innerText = "❌ El PIN debe tener exactamente 12 dígitos.";
        
        // Estilos EXCLUSIVOS solicitados:
        aplicarEstilosBase('#051020'); // Color de texto #051020 y padding 1vh
        return;
    }

    // 2. VALIDACIÓN CONTRA LA BASE DE DATOS SIMULADA
    if (estudiantesClub.hasOwnProperty(pin)) {
        // Estilos para el mensaje de ÉXITO
        const estudiante = estudiantesClub[pin];
        resultado.innerText = `✅ ¡Bienvenido ${estudiante.nombre} ${estudiante.apellido}! Acceso concedido al Club.`;
        aplicarEstilosBase('green'); // Color verde para éxito
        
        // Aquí puedes agregar la redirección:
        // window.location.href = "club.html"; 

    } else {
        // Estilos para el mensaje de PIN INCORRECTO
        resultado.innerText = "❌ PIN incorrecto. Acceso denegado. Inténtalo de nuevo.";
        aplicarEstilosBase('red'); // Color rojo para error
    }
}

// 🗂 Base de datos simulada (mantengo la tuya)
const estudiantesClub = {
    "24263242631": { nombre: "ZXC", apellido: "VBN" },
    "13215": { nombre: "QWE", apellido: "RTY" },
    "1104": { nombre: "ASD", apellido: "FGH" },
};

// 🎯 Mostrar botón CLUB manualmente (mantengo la tuya)
function mostrarBotonClub() {
    document.getElementById("seccionClubes").classList.remove("oculto");
}

// Deshabilita el menú contextual (clic derecho) en toda la página
document.addEventListener('contextmenu', function(e) {
  e.preventDefault();
});

// Bloquea atajos de teclado comunes (Copiar, Pegar, Inspeccionar)
document.addEventListener('keydown', function(e) {
  // Bloquear F12
  if (e.key === 'F12') {
    e.preventDefault();
  }
  
  // Bloquear Ctrl+Shift+I (Inspeccionar) o Ctrl+C (Copiar) o Ctrl+U (Ver Fuente)
  if ((e.ctrlKey || e.metaKey) && (e.shiftKey && e.key === 'I')) {
    e.preventDefault();
  }
  if ((e.ctrlKey || e.metaKey) && e.key === 'c') {
    e.preventDefault();
  }
  if ((e.ctrlKey || e.metaKey) && e.key === 'u') {
    e.preventDefault();
  }
});

// 📢 Función para mostrar el anuncio al cargar
document.addEventListener('DOMContentLoaded', function() {
    const anuncio = document.getElementById('anuncioModal');
    const botonCerrar = document.getElementById('cerrarAnuncio');
    
    // Muestra el modal de anuncio
    if (anuncio) {
        anuncio.style.display = 'flex';
    }

    // Oculta el modal al hacer clic en el botón
    if (botonCerrar) {
        botonCerrar.addEventListener('click', function() {
            if (anuncio) {
                anuncio.style.display = 'none';
            }
        });
    }
});
