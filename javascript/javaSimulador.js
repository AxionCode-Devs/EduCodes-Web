document.addEventListener("DOMContentLoaded", function() {
    const runButton = document.getElementById('run-button');
    const clearButton = document.getElementById('clear-button');
    const codeEditor = CodeMirror.fromTextArea(document.getElementById('code-editor'), {
        mode: "text/x-java",
        theme: "dracula",
        lineNumbers: true,
        matchBrackets: true
    });
    const outputElement = document.getElementById('output');

    // Simulación de ejecución de código Java
    function runJavaCode() {
        const code = codeEditor.getValue();
        outputElement.innerHTML = '';  // Limpiar el área de salida antes de ejecutar el nuevo código

        // Simulación de salida simple
        if (code.includes('System.out.println')) {
            const regex = /System\.out\.println\((.*)\);/g;
            let match;
            while ((match = regex.exec(code)) !== null) {
                const output = match[1].replace(/['"]+/g, ''); // Eliminar comillas en el texto
                const p = document.createElement('p');
                p.textContent = output;
                outputElement.appendChild(p);
            }
        } else {
            const p = document.createElement('p');
            p.textContent = "No se encontró ninguna llamada a System.out.println().";
            outputElement.appendChild(p);
        }
    }

    // Evento para ejecutar código
    runButton.addEventListener('click', runJavaCode);

    // Evento para limpiar el área de salida
    clearButton.addEventListener('click', function() {
        outputElement.innerHTML = '';
    });
});
