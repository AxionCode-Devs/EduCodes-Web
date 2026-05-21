// Función para verificar si el usuario está logueado
function checkUserSession() {
    const username = localStorage.getItem('username');

    if (username) {
        showUserProfile(username); // Si hay usuario, mostrar perfil
    } else {
        showLoginButton(); // Si no, mostrar botón de inicio de sesión
    }
}

function showUserProfile(username) {
    const loginContainer = document.getElementById('login-container');
    loginContainer.innerHTML = `
        <div class="user-profile" onclick="toggleDropdown()">
            <img src="../imagenes/ftperfil.png" alt="Foto de perfil" class="avatar">
            <span class="username">${username}</span>
            <div class="dropdown-menu" id="dropdown-menu">
                <p>${username}</p>
                <img src="../imagenes/ftperfil.png" alt="Perfil" class="profile-image avatar">
                <a href="../html/perfil.html">Perfil</a>
                <a href="#" onclick="logout()">Cerrar sesión</a>
            </div>
        </div>
    `;
}

// Función para mostrar el botón de inicio de sesión
function showLoginButton() {
    const loginContainer = document.getElementById('login-container');
    loginContainer.innerHTML = `
        <a href="../html/login.html" class="login-btn">Iniciar sesión <span class="arrow">→</span></a>
    `;
}

// Mostrar mensaje de acceso denegado
function showAccessDeniedMessage() {
    const message = document.getElementById('access-denied-message');
    const overlay = document.getElementById('overlay');

    overlay.classList.add('show');  // Mostrar fondo oscuro
    message.classList.add('show');  // Mostrar el mensaje emergente
}

// Ocultar mensaje de acceso denegado
function hideAccessDeniedMessage() {
    const message = document.getElementById('access-denied-message');
    const overlay = document.getElementById('overlay');

    message.classList.remove('show');
    overlay.classList.remove('show');
}

// Función para alternar el menú desplegable de usuario
function toggleDropdown() {
    const dropdownMenu = document.getElementById('dropdown-menu');
    dropdownMenu.style.display = dropdownMenu.style.display === 'block' ? 'none' : 'block';
}

// Función para cerrar sesión
function logout() {
    localStorage.removeItem('username');
    localStorage.removeItem('role');
    showLoginButton();
    window.location.href = '../html/login.html'; // Redirige a la página de inicio de sesión
}

// Función para restringir el acceso a los simuladores
function restrictAccessToLoggedOutUsers(event) {
    if (!checkUserLoggedIn()) {
        event.preventDefault(); // Evita la acción predeterminada del enlace
        showAccessDeniedMessage(); // Mostrar el mensaje de acceso denegado
    }
}

// Función para verificar si el usuario ha iniciado sesión
function checkUserLoggedIn() {
    return localStorage.getItem('username') !== null;
}

// Función para manejar el envío de comentarios
function handleCommentSubmission(event) {
    const isLoggedIn = checkUserLoggedIn(); // Verificar si el usuario ha iniciado sesión

    if (!isLoggedIn) {
        event.preventDefault(); // Prevenir el envío real del formulario si no está autenticado
        const overlay = document.getElementById('overlay');
        const popup = document.getElementById('popup');

        overlay.style.display = 'block'; // Mostrar fondo oscuro
        popup.style.display = 'block';   // Mostrar ventana emergente

        // Manejar el botón de iniciar sesión
        document.getElementById('loginButton').onclick = function() {
            window.location.href = '../html/login.html';
        };

        // Manejar el botón de regresar al foro
        document.getElementById('backButton').onclick = function() {
            overlay.style.display = 'none'; // Ocultar fondo oscuro
            popup.style.display = 'none';   // Ocultar ventana emergente
        };

        const responderButton = document.querySelector('.nueva-respuesta .responder-btn');
    if (responderButton) {
        responderButton.onclick = function(event) {
            handleCommentSubmission(event);
        };
    }
    } else {
        // Si el usuario está logueado, permitir que el comentario se envíe normalmente
        return true;
    }
}

// Función para restringir el acceso a los cursos
function restrictCourseAccess(event) {
    if (!checkUserLoggedIn()) {
        event.preventDefault(); // Evita que el usuario acceda al curso si no está logueado
        showAccessDeniedMessage(); // Mostrar el mensaje de acceso denegado
    }
}

// Comprobar el estado de la sesión al cargar la página
window.onload = function() {
    checkUserSession();

    // Añadir verificación de acceso al botón "Empezar Curso"
    const startCourseButtons = document.querySelectorAll('.btn-inscripcion[href="../html/curso1.html"], .btn-inscripcion[href="../html/curso2.html"]');
    startCourseButtons.forEach(button => {
        button.addEventListener('click', restrictCourseAccess);
    });

    // Añadir verificación de acceso a los simuladores
    document.querySelectorAll('.btn-simulador').forEach(button => {
        button.addEventListener('click', restrictAccessToLoggedOutUsers);
    });

    // Manejar el botón de iniciar sesión en la ventana emergente
    const loginButton = document.getElementById('loginButton');
    if (loginButton) {
        loginButton.onclick = function() {
            window.location.href = '../html/login.html'; // Redirigir a la página de inicio de sesión
        };
    }

    // Manejar el botón de regresar
    const backButton = document.getElementById('backButton');
    if (backButton) {
        backButton.onclick = function() {
            hideAccessDeniedMessage(); // Ocultar la ventana emergente
        };
    }
};
