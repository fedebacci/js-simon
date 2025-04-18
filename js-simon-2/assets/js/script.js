// COMMENTO NORMALE
// ! COMMENTO ERRORE
// ? COMMENTO DOMANDA
// * COMMENTO HIGHLIGHT
// # COMMENTO WARNING
// - COMMENTO TEXT
// todo COMMENTO TODO



// # VARIABILI DEL GIOCO
let combinationType = '';
let combinationLength = 0;
let difficulty = '';
const combination = [];
let remainingTime = 0;
let countdownIntervalId;



// # ELEMENTI HTML DEL GIOCO
// * ELEMENTI PER MOSTRARE/RICEVERE INFORMAZIONI DALLA PAGINA
const pageHeaderElement = document.querySelector('header');
const pageMainElement = document.querySelector('main');
// const combinationTypeDescriptionElement = document.getElementById('combinationTypeDescription');
const difficultyDescriptionElement = document.getElementById('difficultyDescription');
const gameScreenElement = document.getElementById('gameScreenElement');
const combinationListElement = document.getElementById('combination-list');
const countdownElement = document.getElementById('countdown');
const instructionsElement = document.getElementById('instructions');
const answersFormElement = document.getElementById('answers-form');
const colorsOptionsElement = document.getElementById('colorsOptions');
const answersInputGroupElement = document.getElementById('input-group');
const errorMessageElement = document.getElementById('message');
const resultsElement = document.getElementById('results');
// * ELEMENTI DI CUI ASCOLTARE GLI EVENTI
const selectCombinationTypeElement = document.getElementById('selectCombinationType');
const selectDifficultyElement = document.getElementById('selectDifficulty');
const startGameButton = document.getElementById('startGameButton');
const confirmButton = document.getElementById('confirmButton');



// # LISTENERS DI EVENTI
startGameButton.addEventListener('click', startGame);
confirmButton.addEventListener('click', function(e) {
    const answerInputs = answersInputGroupElement.querySelectorAll('input');
    // console.debug(answerInputs);
    // if (!resultsElement.classList.contains('d-none')) resetResultsElement();
    const isAnswerValid = validateUserAnswer(answerInputs);
    console.debug(isAnswerValid);
    if (isAnswerValid === true) checkAnswer(answerInputs, combination);
});
selectCombinationTypeElement.addEventListener('change', function(e) {
    combinationType = getCombinationType(e.target.value);
    describeCombinationType();
    removeDifficultyOptions();
    showDifficultyOptions();
    difficulty = getDifficulty(selectDifficultyElement.value);
    describeDifficulty();
});
selectDifficultyElement.addEventListener('change', function(e) {
    difficulty = getDifficulty(e.target.value);
    describeDifficulty();
});



// # FUNZIONI INIZIALI
showCombinationTypesOptions();
combinationType = getCombinationType(selectCombinationTypeElement.value);
describeCombinationType();
showDifficultyOptions();
difficulty = getDifficulty(selectDifficultyElement.value);
describeDifficulty();