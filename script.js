// Botones de modo: Pomodoro, Short Break, Long Break
const pomodoroBtn = document.querySelector(".break-container button:nth-child(1)");
const shortBreakBtn = document.querySelector(".break-container button:nth-child(2)");
const longBreakBtn = document.querySelector(".break-container button:nth-child(3)");
// Botones Start y Stop
const startButton = document.getElementById("start-button");
const resetButton = document.getElementById("stop-button");
// Elementos minutos y segundos
const minutesDisplay = document.getElementById("minutes");
const secondsDisplay = document.getElementById("seconds");

// Variables para controlar el temporizador
let timerInterval = null;  // Guarda el setInterval para poder pausarlo o resetearlo
let initialMinutes = 25; // Valor inicial del temporizador en minutos (25 para Pomodoro)
let minutes = initialMinutes; // Minutos restantes
let seconds = 0; // Segundos restantes  


function playSound() { // Función para reproducir un sonido cuando el temporizador termina
    const audio = new Audio('assets/cat.mp3');
    audio.play();
}

// Muestra una notificación en pantalla
function showNotification(message = "The Pomodoro finished. Take a break!😺") { // Muestra una notificación cuando el temporizador termina
    const notification = document.getElementById("notification"); 
    notification.textContent = message; // Actualiza el mensaje de la notificación
    notification.classList.remove("hidden"); // Asegura que la notificación esté visible
    notification.classList.add("show"); // Añade la clase para mostrar la notificación

    setTimeout(() => { // Después de 3 segundos, oculta la notificación
        notification.classList.remove("show"); // Quita la clase para ocultar la notificación
        notification.classList.add("hidden"); // Asegura que la notificación esté oculta
    }, 3000);
}

// Actualiza el display del timer
function updateTimerDisplay(min, sec) {
    // Asegura que los minutos y segundos tengan dos dígitos
    minutesDisplay.textContent = min.toString().padStart(2, "0"); // Rellena con ceros a la izquierda si es necesario
    secondsDisplay.textContent = sec.toString().padStart(2, "0"); // Rellena con ceros a la izquierda si es necesario
}

// Cambia el modo y resetea el timer
function setMode(mins) {
    initialMinutes = mins; // Actualiza el valor inicial del temporizador
    minutes = mins; // Resetea los minutos al nuevo valor
    seconds = 0; // Resetea los segundos a 0
    updateTimerDisplay(minutes, seconds);  // Actualiza el display del timer
    clearInterval(timerInterval); // Limpia el intervalo del temporizador si estaba corriendo
    timerInterval = null; // Resetea el intervalo del temporizador
    startButton.textContent = "Start"; // Cambia el texto del botón a "Start"
}

// Cuenta atrás del temporizador
function startTimer() {
    if (timerInterval) return; // Si ya está corriendo, no hace nada
    // Resetea los minutos y segundos al valor inicial
    timerInterval = setInterval(() => {
        if (seconds === 0) {  // Si los segundos llegan a 0
        if (minutes === 0) {  // Si los minutos también llegan a 0, se detiene el temporizador
            clearInterval(timerInterval); // Limpia el intervalo
            playSound(); // Reproduce el sonido
            showNotification(); // Muestra la notificación
            timerInterval = null; // Resetea el intervalo del temporizador
            startButton.textContent = "Start"; // Cambia el texto del botón a "Start"
            return;
        }
        minutes--; // Resta un minuto
        seconds = 59; // Resetea los segundos a 59
        } else {
        seconds--; // Resta un segundo
        }
        updateTimerDisplay(minutes, seconds); // Actualiza el display del timer
    }, 1000);
}

// Eventos de los botones de modo
pomodoroBtn.addEventListener("click", () => setMode(25)); // 25 minutos para Pomodoro
shortBreakBtn.addEventListener("click", () => setMode(1)); // 5 minutos para Short Break
longBreakBtn.addEventListener("click", () => setMode(15)); // 15 minutos para Long Break

// Evento Start/Pause
startButton.addEventListener("click", () => {
    if (startButton.textContent === "Start") { // Si el botón dice "Start", inicia el temporizador
        startTimer(); // Inicia el temporizador
        startButton.textContent = "Pause"; // Cambia el texto del botón a "Pause"
    } else {
        // Pause
        clearInterval(timerInterval); // Limpia el intervalo del temporizador
        timerInterval = null; // Resetea el intervalo del temporizador
        startButton.textContent = "Start"; // Cambia el texto del botón a "Start"
    }
});


// Reset
resetButton.addEventListener("click", () => { 
    clearInterval(timerInterval); // Limpia el intervalo del temporizador
    timerInterval = null; // Resetea el intervalo del temporizador
    minutes = initialMinutes;  // Resetea los minutos al valor inicial
    seconds = 0; // Resetea los segundos a 0
    updateTimerDisplay(minutes, seconds); // Actualiza el display del timer
    startPauseButton.textContent = "Start"; // Cambia el texto del botón a "Start"
});