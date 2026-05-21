let pyodide;
let inputsQueue = [];
let isInputRequested = false;
let resolveInput = null;

// Inicializar Pyodide
async function main() {
    try {
        pyodide = await loadPyodide();
        // Cargar los módulos adicionales si es necesario
        await pyodide.loadPackage("numpy");
        // ...
        const runButton = document.getElementById('run-button');
        runButton.textContent = 'Ejecutar Código ▶';
        runButton.disabled = false;
    } catch (error) {
        console.error("Error al cargar Pyodide:", error);
        alert("No se pudo cargar el entorno de Pyodide. Asegúrate de que la conexión a Internet esté activa.");
    }
}

// Inicialización de Pyodide al cargar el documento
main();

document.addEventListener('DOMContentLoaded', (event) => {
    // Inicializar el editor CodeMirror
    const editor = CodeMirror.fromTextArea(document.getElementById("code-editor"), {
        mode: "python",
        theme: "dracula",
        lineNumbers: true,
        autoCloseBrackets: true,
        matchBrackets: true,
        indentUnit: 4,
        tabSize: 4,
        indentWithTabs: true,
        extraKeys: {
            "Tab": "indentMore",
            "Shift-Tab": "indentLess"
        }
    });

    const runButton = document.getElementById('run-button');
    const clearButton = document.getElementById('clear-button');
    const output = document.getElementById('output');

    // Capturar la entrada desde la consola (pre)
    output.addEventListener('keypress', (e) => {
        if (e.key === 'Enter' && isInputRequested) {
            e.preventDefault();
            let inputText = output.textContent.split("\n").pop().trim(); // Obtener la última línea escrita
            inputsQueue.push(inputText);
            resolveInput(inputText);
            isInputRequested = false; // Resetear el estado de solicitud de entrada
        }
    });

    // Simular input() manejando la entrada en la consola
    function simulateInput() {
        return new Promise((resolve) => {
            isInputRequested = true;
            resolveInput = resolve;
        });
    }

    // Ejecutar el código al hacer clic en "Ejecutar Código"
    runButton.addEventListener('click', async () => {
        const code = editor.getValue();
        output.textContent = '';  // Limpiar la consola antes de ejecutar
        inputsQueue = []; // Limpiar la cola de entradas
        isInputRequested = false;

        try {
            // Redirigir stdout a una variable para capturar salida
            pyodide.runPython(`
                import sys
                import io
                sys.stdout = io.StringIO()
            `);

            // Reemplazar input() para que use simulateInput()
            pyodide.registerJsModule('input', simulateInput);
            await pyodide.runPythonAsync(`
                import builtins
                builtins.input = input
            `);

            // Ejecutar el código del usuario
            await pyodide.runPythonAsync(code);

            // Obtener la salida
            const stdout = pyodide.runPython("sys.stdout.getvalue()");
            output.textContent += stdout; // Mostrar la salida

            // Restaurar stdout
            pyodide.runPython("sys.stdout = sys.__stdout__");
        } catch (error) {
            output.textContent = `Error: ${error.message}`; // Mostrar errores
        }
    });

    // Limpiar consola
    clearButton.addEventListener('click', () => {
        output.textContent = '';
    });
});
