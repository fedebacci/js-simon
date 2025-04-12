// COMMENTO NORMALE
// ! COMMENTO ERRORE
// ? COMMENTO DOMANDA
// * COMMENTO HIGHLIGHT
// # COMMENTO WARNING
// - COMMENTO TEXT
// todo COMMENTO TODO



// # NUOVE VARIABILI PER LA SELEZIONE DELLA DIFFICOLTA
const selectDifficultyElement = document.getElementById('selectDifficulty');
const difficultyDescriptionElement = document.getElementById('difficultyDescription');
const difficulties = [
    {
        name: 'facile',
        requestedNumbers: 3,
        maxNumber: 20,
        minNumber: 1,
        time: 30000,
    },
    {
        name: 'medio',
        requestedNumbers: 5,
        maxNumber: 50,
        minNumber: 1,
        time: 15000,
    },
    {
        name: 'difficile',
        requestedNumbers: 7,
        maxNumber: 100,
        minNumber: 1,
        time: 5000,
    }
];



// * VARIABILI NOTE DEL GIOCO
let requestedNumbers = 0;
let maxNumber = 0;
let minNumber = 0;
let remainingTime = 0;
const numbers = [];
let countdownIntervalId;
const pageHeaderElement = document.querySelector('header');
const pageMainElement = document.querySelector('main');
const gameScreenElement = document.getElementById('gameScreenElement');
const numbersListElement = document.getElementById('numbers-list');
const countdownElement = document.getElementById('countdown');
const instructionsElement = document.getElementById('instructions');
const answersFormElement = document.getElementById('answers-form');
const answersInputGroupElement = document.getElementById('input-group');
const errorMessageElement = document.getElementById('message');
const resultsElement = document.getElementById('results');



// * LISTENERS DI EVENTI
const startGameButton = document.getElementById('startGameButton');
startGameButton.addEventListener('click', startGame);
const confirmButton = document.getElementById('confirmButton');
confirmButton.addEventListener('click', function(e) {
    const answerInputs = answersInputGroupElement.querySelectorAll('input');
    if (!resultsElement.classList.contains('d-none')) resetResultsElement();
    const isAnswerValid = validateUserAnswer(answerInputs);
    if (isAnswerValid === true) checkAnswer(answerInputs, numbers);
});
selectDifficultyElement.addEventListener('change', function(e) {
    describeDifficulty(e.target.value);
});



describeDifficulty(selectDifficultyElement.value);