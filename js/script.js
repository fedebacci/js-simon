// COMMENTO NORMALE
// ! COMMENTO ERRORE
// ? COMMENTO DOMANDA
// * COMMENTO HIGHLIGHT
// # COMMENTO WARNING
// - COMMENTO TEXT
// todo COMMENTO TODO



// * VARIABILI NOTE DEL GIOCO
const requestedNubers = 5;
const maxNumber = 50;
const minNumber = 1;
const numbers = generateCombination(requestedNubers, maxNumber, minNumber);
const numbersListElement = document.getElementById('numbers-list');
// let remainingTime = 30000;
let remainingTime = 3000;
const countdownElement = document.getElementById('countdown');
let countdownIntervalId;
const instructionsElement = document.getElementById('instructions');
const answersFormElement = document.getElementById('answers-form');
const answerInputs = answersFormElement.querySelectorAll('input')


// * LISTENERS DI EVENTI
answersFormElement.addEventListener('submit', function(e) {
    checkAnswer(e);
});


// * CHIAMO LA FUNZIONE PER FAR INIZIARE IL GIOCO
startGame(numbers);