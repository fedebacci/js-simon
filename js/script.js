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
let remainingTime = 3000;
const countdownElement = document.getElementById('countdown');
let countdownIntervalId;
const instructionsElement = document.getElementById('instructions');
const answersFormElement = document.getElementById('answers-form');
const answerInputs = answersFormElement.querySelectorAll('input');
let messageElement = document.getElementById('message');


// * LISTENERS DI EVENTI
// * VECCHIA VERSIONE PRIMA DELLA VALIDAZIONE FATTA DA ME (VALIDAZIONE AUTOMATICA DEL BROWSER)
// todo: AGGIUNGERE LA VALIDAZIONE
// ? COME IMPEDIRE LA VALIDAZIONE AUTOMATICA DEL BROWSER?
// ? FORSE MODIFICANDO IL BOTTONE COME TYPE="BUTTON" E SPOSTANDO QUESTE AZIONI SUL LISTENER DI EVENTI "CLICK" DEL PULSANTE INVECE CHE SUL LISTENER "INPUT" DEL FORM
// answersFormElement.addEventListener('submit', function(e) {
//     e.preventDefault();
//     checkAnswer();
// });
// * VERSIONE CON VALIDAZIONE FATTA DA ME
const confirmButton = document.getElementById('confirmButton');
confirmButton.addEventListener('click', function(e) {
    const isAnswerValid = validateUserAnswer();
    if (isAnswerValid) checkAnswer();
});


// * CHIAMO LA FUNZIONE PER FAR INIZIARE IL GIOCO
startGame(numbers);