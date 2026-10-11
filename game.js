// Base de datos de categorías con palabras de ejemplo (puedes completarlas hasta 100+)
const categorias = [
    {
        id: 'animales',
        nombre: '🐾 Animales',
        palabras: ['Elefante', 'Jirafa', 'Delfín', 'Pingüino', 'Tiburón', 'Kanguro', 'Cangrejo', 'Águila', 'Gorila', 'Hipopótamo', 'León', 'Cebra', 'Cocodrilo', 'Murciélago', 'Zorro', 'Búho', 'Koala', 'Panda', 'Hormiga', 'Camello']
    },
    {
        id: 'paises',
        nombre: '🌍 Países',
        palabras: ['Argentina', 'Japón', 'Francia', 'Canadá', 'Brasil', 'Italia', 'Australia', 'Egipto', 'México', 'España', 'Alemania', 'Sudáfrica', 'India', 'Rusia', 'Islandia', 'China', 'Grecia', 'Noruega', 'Colombia', 'Portugal']
    },
    {
        id: 'famosos',
        nombre: '⭐ Famosos',
        palabras: ['Lionel Messi', 'Leonardo DiCaprio', 'Taylor Swift', 'Michael Jackson', 'Brad Pitt', 'Shakira', 'Will Smith', 'Tom Cruise', 'Beyoncé', 'Cristiano Ronaldo', 'Lady Gaga', 'Keanu Reeves', 'Rihanna', 'Johnny Depp', 'Ariana Grande', 'Robert Downey Jr.', 'Emma Watson', 'Dua Lipa', 'Zendaya', 'Lionel Richie']
    },
    {
        id: 'peliculas',
        nombre: '🎬 Películas',
        palabras: ['Titanic', 'Avatar', 'Gladiador', 'Matrix', 'Inception', 'Toy Story', 'Jurassic Park', 'Star Wars', 'El Padrino', 'Frozen', 'Buscando a Nemo', 'Avengers', 'El Rey León', 'Volver al Futuro', 'Harry Potter', 'Pulp Fiction', 'Shrek', 'Up', 'Guasón', 'Interstellar']
    },
    {
        id: 'comidas',
        nombre: '🍕 Comidas',
        palabras: ['Pizza', 'Hamburguesa', 'Asado', 'Sushi', 'Empanadas', 'Milanesa', 'Fideos', 'Tacos', 'Lasagna', 'Hot Dog', 'Paella', 'Ensalada', 'Sopa', 'Burrito', 'Ramen', 'Choripán', 'Locro', 'Ñoquis', 'Polenta', 'Sandwich']
    },
    {
        id: 'deportes',
        nombre: '⚽ Deportes',
        palabras: ['Fútbol', 'Basquetbol', 'Tenis', 'Natación', 'Rugby', 'Vóley', 'Boxeo', 'Golf', 'Ciclismo', 'Hockey', 'Skate', 'Surf', 'Atletismo', 'Badminton', 'Polo', 'Handball', 'Automovilismo', 'Esquí', 'Gimnasia', 'Béisbol']
    },
    {
        id: 'profesiones',
        nombre: '💼 Profesiones',
        palabras: ['Médico', 'Profesor', 'Bombero', 'Policía', 'Arquitecto', 'Ingeniero', 'Abogado', 'Chef', 'Piloto', 'Astronauta', 'Veterinario', 'Programador', 'Mecánico', 'Fotógrafo', 'Electricista', 'Plomero', 'Dentista', 'Carpintero', 'Enfermero', 'Periodista']
    },
    {
        id: 'objetos',
        nombre: '📦 Objetos',
        palabras: ['Celular', 'Computadora', 'Heladera', 'Espejo', 'Mochila', 'Paraguas', 'Linterna', 'Cámara', 'Reloj', 'Bicicleta', 'Almohada', 'Cuchara', 'Televisor', 'Lentes', 'Llave', 'Guitarra', 'Ventilador', 'Sartén', 'Tijera', 'Candado']
    },
    {
        id: 'musica',
        nombre: '🎵 Música y Bandas',
        palabras: ['Rock', 'Pop', 'Cumbia', 'Reggaeton', 'Jazz', 'The Beatles', 'Queen', 'Metallica', 'AC/DC', 'Soda Stereo', 'Coldplay', 'Charly García', 'Luis Miguel', 'Bad Bunny', 'Callejeros', 'Los Redondos', 'Daft Punk', 'Pink Floyd', 'Nirvana', 'Eminem']
    },
    {
        id: 'lugares',
        nombre: '🏛️ Lugares',
        palabras: ['Playa', 'Hospital', 'Escuela', 'Aeropuerto', 'Cine', 'Supermercado', 'Parque', 'Museo', 'Biblioteca', 'Gimnasio', 'Estadio', 'Zoológico', 'Restaurante', 'Farmacia', 'Iglesia', 'Castillo', 'Pirámide', 'Teatro', 'Estación', 'Oficina']
    }
];

// Variables de Estado del Juego
let categoriaSeleccionada = null;
let palabrasDisponibles = [];
let adivinadas = [];
let incorrectas = [];
let palabraActual = "";
let juegoActivo = false;
let tiempoRestante = 60;
let intervaloTimer = null;

// Referencias del DOM
const screenMenu = document.getElementById('screen-menu');
const screenGame = document.getElementById('screen-game');
const screenResults = document.getElementById('screen-results');
const categoriesContainer = document.getElementById('categories-container');
const currentWordEl = document.getElementById('current-word');
const timerEl = document.getElementById('timer');
const btnStartRound = document.getElementById('btn-start-round');
const btnRestart = document.getElementById('btn-restart');
const finalScoreEl = document.getElementById('final-score');
const listCorrectas = document.getElementById('list-correctas');
const listIncorrectas = document.getElementById('list-incorrectas');

// Inicializar menú
function initMenu() {
    categoriesContainer.innerHTML = '';
    categorias.forEach(cat => {
        const btn = document.createElement('button');
        btn.classList.add('btn-categoria');
        btn.innerText = cat.nombre;
        btn.onclick = () => seleccionarCategoria(cat);
        categoriesContainer.appendChild(btn);
    });
}

function seleccionarCategoria(cat) {
    categoriaSeleccionada = cat;
    palabrasDisponibles = [...cat.palabras].sort(() => Math.random() - 0.5); // Mezclar
    adivinadas = [];
    incorrectas = [];
    
    screenMenu.classList.add('hidden');
    screenGame.classList.remove('hidden');
    currentWordEl.innerText = `Categoría: ${cat.nombre}`;
    btnStartRound.style.display = 'block';
}

// Iniciar ronda con temporizador
btnStartRound.onclick = () => {
    btnStartRound.style.display = 'none';
    juegoActivo = true;
    tiempoRestante = 60;
    timerEl.innerText = tiempoRestante;

    siguientePalabra();
    solicitarPermisoSensores();

    intervaloTimer = setInterval(() => {
        tiempoRestante--;
        timerEl.innerText = tiempoRestante;
        if (tiempoRestante <= 0) {
            terminarJuego();
        }
    }, 1000);
};

function siguientePalabra() {
    if (palabrasDisponibles.length === 0) {
        palabrasDisponibles = [...categoriaSeleccionada.palabras].sort(() => Math.random() - 0.5);
    }
    palabraActual = palabrasDisponibles.pop();
    currentWordEl.innerText = palabraActual;
}

// Control por Movimiento de Celular (Acelerómetro optimizado a ~30 grados)
function solicitarPermisoSensores() {
    if (typeof DeviceMotionEvent !== 'undefined' && typeof DeviceMotionEvent.requestPermission === 'function') {
        DeviceMotionEvent.requestPermission()
            .then(response => {
                if (response === 'granted') {
                    window.addEventListener('devicemotion', manejarMovimiento);
                }
            }).catch(console.error);
    } else {
        window.addEventListener('devicemotion', manejarMovimiento);
    }
}

let bloqueado = false; // Bloqueo para el tiempo de espera y evitar rebotes

function manejarMovimiento(event) {
    if (!juegoActivo || bloqueado) return;

    // Con el celular en la frente (vertical), la gravedad sobre el eje Y ronda los 9.8 m/s².
    // 30 grados de inclinación equivalen aproximadamente a un cambio donde Y pasa a ser menor a ~5 o mayor a ~13.
    const accelerationY = event.accelerationIncludingGravity.y;

    if (accelerationY < 5) { 
        // Inclinación hacia abajo (Correcto)
        adivinadas.push(palabraActual);
        triggerFeedback('correcto', '¡CORRECTO!');
        bloquearTemporalmente();
    } else if (accelerationY > 13) {
        // Inclinación hacia arriba (Pasar / Incorrecto)
        incorrectas.push(palabraActual);
        triggerFeedback('incorrecto', '¡PASASTE!');
        bloquearTemporalmente();
    }
}

function bloquearTemporalmente() {
    bloqueado = true;
    
    // Espera de 0.75 segundos (750 ms) antes de pasar a la siguiente palabra
    setTimeout(() => {
        if (juegoActivo) {
            siguientePalabra();
            currentWordEl.style.color = '#ffffff';
            bloqueado = false;
        }
    }, 750);
}

function triggerFeedback(tipo, mensajeTemporal) {
    currentWordEl.innerText = mensajeTemporal;
    currentWordEl.style.color = tipo === 'correcto' ? '#2ecc71' : '#e74c3c';
}

function terminarJuego() {
    juegoActivo = false;
    clearInterval(intervaloTimer);
    window.removeEventListener('devicemotion', manejarMovimiento);

    screenGame.classList.add('hidden');
    screenResults.classList.remove('hidden');

    finalScoreEl.innerText = adivinadas.length;

    listCorrectas.innerHTML = adivinadas.map(p => `<li>✅ ${p}</li>`).join('');
    listIncorrectas.innerHTML = incorrectas.map(p => `<li>❌ ${p}</li>`).join('');
}

btnRestart.onclick = () => {
    screenResults.classList.add('hidden');
    screenMenu.classList.remove('hidden');
};

initMenu();
