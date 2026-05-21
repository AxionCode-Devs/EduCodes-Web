// Muestra la Parte 2 al hacer clic en el botón de la Parte 1
document.getElementById('showPart2Btn').addEventListener('click', function() {
    document.getElementById('parte1').style.display = 'none'; // Oculta la Parte 1
    document.getElementById('parte2').style.display = 'block'; // Muestra la Parte 2
});

// Muestra la Parte 3 al hacer clic en el botón de la Parte 2
document.getElementById('showPart3Btn').addEventListener('click', function() {
    document.getElementById('parte2').style.display = 'none'; // Oculta la Parte 2
    document.getElementById('parte3').style.display = 'block'; // Muestra la Parte 3
});

// Opción para finalizar o mostrar un mensaje al hacer clic en el botón de la Parte 3
document.getElementById('finishBtn').addEventListener('click', function() {
    alert('¡Gracias por completar el curso!'); // Puedes cambiar esto por cualquier acción
    // Aquí puedes redirigir o mostrar una página de finalización si lo deseas
});
