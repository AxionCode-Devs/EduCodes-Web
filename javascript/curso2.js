// Script para la interacción del Curso 2: Introducción a la Ciberseguridad

document.addEventListener("DOMContentLoaded", function() {
    // Aquí puedes añadir interacciones específicas para el curso
    console.log("Curso 2: Introducción a la Ciberseguridad cargado correctamente.");
});

// Función para manejar la presentación de actividades
function presentarActividad(actividad) {
    alert(`Actividad: ${actividad}`);
}

// Función para ir a la siguiente parte del curso
function irASiguienteParte() {
    // Ocultar la primera sección y mostrar la segunda
    const modulo1 = document.getElementById("modulo1");
    const modulo2 = document.getElementById("modulo2");

    modulo1.style.display = "none"; // Ocultar módulo 1
    modulo2.style.display = "block"; // Mostrar módulo 2
}
