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
const numbers = [];
let remainingTime = 0;
let countdownIntervalId;
const numbersListElement = document.getElementById('numbers-list');
const countdownElement = document.getElementById('countdown');
const instructionsElement = document.getElementById('instructions');
const answersFormElement = document.getElementById('answers-form');
const answerInputs = answersFormElement.querySelectorAll('input');
const errorMessageElement = document.getElementById('message');
const resultsElement = document.getElementById('results');



// * LISTENERS DI EVENTI
// * VECCHIA VERSIONE PRIMA DELLA VALIDAZIONE FATTA DA ME (VALIDAZIONE AUTOMATICA DEL BROWSER)
// answersFormElement.addEventListener('submit', function(e) {
//     e.preventDefault();
//     checkAnswer();
// });
// * VERSIONE CON VALIDAZIONE FATTA DA ME
const confirmButton = document.getElementById('confirmButton');
confirmButton.addEventListener('click', function(e) {
    if (!resultsElement.classList.contains('d-none')) resetResultsElement();
    const isAnswerValid = validateUserAnswer();
    if (isAnswerValid === true) checkAnswer(numbers);
});



// * CHIAMO LA FUNZIONE PER FAR INIZIARE IL GIOCO
startGame();