function toggleChatbot() {
    const chatbotWindow = document.getElementById('chatbot-window');
    const chatbotIcon = document.getElementById('chatbot-icon');

    if (chatbotWindow.classList.contains('hidden')) {
        chatbotWindow.classList.remove('hidden');
        chatbotWindow.classList.add('open'); // Añadir clase open para la animación
        chatbotIcon.style.display = 'none'; // Ocultar el ícono
    } else {
        chatbotWindow.classList.remove('open');
        chatbotWindow.classList.add('hidden');
        chatbotIcon.style.display = 'flex'; // Mostrar el ícono
    }
}

function sendMessage() {
    const userInput = document.getElementById('user-input').value;
    if (userInput.trim() === '') return;

    // Mostrar el mensaje del usuario
    const userMessageDiv = document.createElement('div');
    userMessageDiv.classList.add('message', 'user-message');
    userMessageDiv.textContent = userInput;
    document.getElementById('chatbot-messages').appendChild(userMessageDiv);

    // Limpiar el input
    document.getElementById('user-input').value = '';

    // Respuesta del chatbot
    const botMessageDiv = document.createElement('div');
    botMessageDiv.classList.add('message', 'bot-message');
    botMessageDiv.textContent = getResponse(userInput);
    document.getElementById('chatbot-messages').appendChild(botMessageDiv);

    // Auto scroll hacia el último mensaje
    document.getElementById('chatbot-messages').scrollTop = document.getElementById('chatbot-messages').scrollHeight;
}

function getResponse(input) {
    // Normaliza la entrada eliminando acentos y signos de puntuación
    const normalizedInput = normalizeInput(input);

    // Respuestas predefinidas
    const responses = {
        'hola': '¡Hola! ¿Cómo puedo ayudarte hoy?',
        'cursos': 'Ofrecemos varios cursos de programacion de distintos lenguajes.',
        'registrar': 'Puedes registrarte a través de nuestra página de inicio. Busca el botón de "Registrarse".',
        'gracias': '¡De nada! Si necesitas más ayuda, no dudes en preguntar.',
        'adiós': '¡Hasta luego! Espero verte pronto.',
        'horarios': 'Nuestros cursos tienen horarios flexibles, puedes consultarlos en la sección de "Cursos".',
        'pago': 'Aceptamos varios métodos de pago, incluyendo tarjetas de crédito y PayPal.',
        'contacto': 'Puedes contactarnos a través de nuestro formulario en la página de contacto.',
        'soporte': 'Nuestro equipo de soporte está disponible 24/7 para ayudarte.',
        'materiales': 'Proporcionamos materiales de estudio digitales para todos nuestros cursos.',
        'default': 'Lo siento, no entendí tu pregunta. ¿Puedes reformularla?'
    };

    // Verificar si la entrada contiene alguna de las palabras clave
    for (const key in responses) {
        if (normalizedInput.includes(key)) {
            return responses[key];
        }
    }

    // Retornar la respuesta por defecto si no se encontró una coincidencia
    return responses['default'];
}

function normalizeInput(input) {
    // Convertir a minúsculas
    let normalized = input.toLowerCase();

    // Eliminar acentos
    normalized = normalized.normalize("NFD").replace(/[\u0300-\u036f]/g, "");

    // Eliminar signos de interrogación y exclamación
    normalized = normalized.replace(/[¿?¡!]/g, '').trim();

    // Retornar la entrada normalizada
    return normalized.replace(/\s+/g, ' '); // Reemplaza múltiples espacios por uno solo
}
