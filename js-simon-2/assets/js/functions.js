// COMMENTO NORMALE
// ! COMMENTO ERRORE
// ? COMMENTO DOMANDA
// * COMMENTO HIGHLIGHT
// # COMMENTO WARNING
// - COMMENTO TEXT
// todo COMMENTO TODO





// # FUNZIONI CHE GESTISCONO LA LOGICA DI GIOCO
// * FUNZIONI PER LA GESTIONE DELLA SCELTA DEL TIPO DI COMBINAZIONE E DELLA DIFFICOLTA
const showCombinationTypesOptions = () => {
    combinationTypes.forEach(combinationType => {
        const newCombinationTypeOptionElement = document.createElement('option');
        newCombinationTypeOptionElement.value = combinationType.value;
        newCombinationTypeOptionElement.innerText = combinationType.name;

        selectCombinationTypeElement.appendChild(newCombinationTypeOptionElement);
    });
};



const showDifficultyOptions = () => {
    const difficulties = getCombinationTypeDifficulties();
    difficulties.forEach(difficulty => {
        const newDifficultyOptionElement = document.createElement('option');
        newDifficultyOptionElement.value = difficulty.value;
        newDifficultyOptionElement.innerText = difficulty.name;

        selectDifficulty.appendChild(newDifficultyOptionElement);
    });
};



const removeDifficultyOptions = () => {
    selectDifficulty.innerHTML = '';
};



const getCombinationTypeDifficulties = () => {
    let difficulties;

    switch(true) {
        case combinationType.value === 'numbers':
            difficulties = numbersDifficulties;
            break;
        case combinationType.value === 'letters':
            difficulties = lettersDifficulties;
            break;
        case combinationType.value === 'colors':
            difficulties = colorsDifficulties;
            break;
        default:
            difficulties = numbersDifficulties;
            break;
    };

    return difficulties;
};



const getCombinationType = (chosenCombinationType) => {
    return combinationTypes.find((combinationType) => combinationType.value === chosenCombinationType)
}



const getDifficulty = (chosenDifficulty) => {
    return getCombinationTypeDifficulties().find((difficulty) => difficulty.value === chosenDifficulty);
}



const setDifficultyLevel = () => {
    combinationLength = difficulty.combinationLength;
    remainingTime = difficulty.time;
};



// * FUNZIONI PER L'EFFETTIVO SVOLGIMENTO DEL GIOCO
const startGame = () => {
    console.clear();
    // console.debug('GAME STARTED');
    // console.debug('combinationType', combinationType);
    // console.debug('difficulty', difficulty);

    // * FUNZIONI PER LOGICA DI GIOCO
    setDifficultyLevel();
    generateCombination();
    setRemainingTime();
    // ? FORSE METTERE PER ULTIMA DOPO FUZIONI PER GESTIONE DI COSA MOSTRARE AD UTENTE
    startTimer();
    
    // * FUNZIONI PER GESTIONE DI COSA MOSTRARE AD UTENTE
    showCombination();
    hidePageElements();
    showGameScreen();
    
};



const generateCombination = () => {
    console.debug('combinationType', combinationType);
    console.debug('difficulty', difficulty);

    while (combination.length < combinationLength) {
        let newElement;
        if (combinationType.value === 'numbers') {
            newElement = generateRandomNumber(1, difficulty.possibleOptions);
        } else {
            newElement = generateRandomElement(1, difficulty.possibleOptions);
        }
        if (combination.includes(newElement) === false) combination.push(newElement);
    };

    console.debug(combination);
    // ! DEBUG
    // combination.length = 0;
};



const generateRandomNumber = (max, min) => {
    return Math.floor(Math.random() * (max - min + 1)) + min;
};
const generateRandomElement = (max, min) => {
    return combinationType.options[generateRandomNumber(max, min)];
};



const setRemainingTime = () => {
    remainingTime = difficulty.time;
};



/**
 * Funzione che fa partire il timer per ricordare la combinazione
 * Inizialmente mostra il valore iniziale
 * In seguito fa partire un interval che decrementa il tempo a disposizione ogni secondo
 */
const startTimer = () => {
    showTimeLeft();

    countdownIntervalId = setInterval(function() {
        decreaseTimer(remainingTime);
    }, 1000);
};



/**
 * Funzione che decrementa il tempo a disposizione
 * Inizialmente controlla che il tempo rimasto sia maggiore di 0
 * Se lo è lo decrementa e richiama la funzione che lo mostra sullo schermo
 * Se non lo è rimuove l'interval che la richiama ogni secondo e richiama la funzione che nasconde i numeri all'utente e la funzione che mostra la schermata per l'inserimento dei numeri da parte sua
 */
const decreaseTimer = () => {
    if (remainingTime > 0) {
        remainingTime -= 1000;
        showTimeLeft();
    } else {
        hideCountdown();
        // console.debug(requestedNumbers);
        showAnswersForm();
        clearInterval(countdownIntervalId);
        countdownIntervalId = undefined;
    };
};








// # FUNZIONI CHE GESTISCONO CIO CHE VIENE MOSTRATO O RIMOSSO
/**
 * Funzione che nasconde la pagina iniziale. Nasconde l'header per la navigazione tra gli esercizi e il blocco contenente la descrizione dell'esercizio e la scelta della difficoltà 
 */
const hidePageElements = () => {
    pageHeaderElement.classList.add('d-none');
    pageMainElement.classList.add('d-none');
};



/**
 * Funzione che nasconde la pagina iniziale. Nasconde l'header per la navigazione tra gli esercizi e il blocco contenente la descrizione dell'esercizio e la scelta della difficoltà 
 */
const showPageElements = () => {
    pageHeaderElement.classList.remove('d-none');
    pageMainElement.classList.remove('d-none');
};



/**
 * Funzione che mostra la pagina di gioco.
 */
const showGameScreen = () => {
    gameScreenElement.classList.remove('d-none');
    gameScreenElement.classList.add('d-flex');
};



/**
 * Funzione che nasconde la pagina di gioco.
 */
const hideGameScreen = () => {
    gameScreenElement.classList.add('d-none');
    gameScreenElement.classList.remove('d-flex');
};



const showCombination = () => {
    combination.forEach(element => {
        const newListElement = document.createElement('li');
        newListElement.className = 'shownElement p-1 border border-dark-subtle rounded';
        if (combinationType.value === 'colors') {
            // newListElement.style.backgroundColor = element;
            newListElement.innerHTML = `
            <div style="background-color: ${element}" class="h-100 border rounded">
            </div>
            `;
        } else {
            newListElement.innerHTML = `
            <div class="d-flex justify-content-center align-items-center h-100">
                ${element}
            </div>
            `;
        };
        combinationListElement.appendChild(newListElement);
    });
};



/**
 * Funzione che mostra sullo schermo il tempo rimanente
 */
const showTimeLeft = () => {
    countdownElement.innerText = remainingTime / 1000;
}



/**
 * Funzione che nasconde il countdown e la combinazione da ricordare
 */
const hideCountdown =  () => {
    countdownElement.classList.add('d-none');
    combinationListElement.classList.add('d-none');
};



/**
 * Funzione che modifica le istruzioni e mostra all'utente il form per inserire la combinazione che si ricordano
 */
const showAnswersForm =  () => {
    instructionsElement.innerText = `Inserisci la combinazione (L'ordine non è importante)`;

    // todo: GESTIRE INPUT DIVERSI A SECONDA DEL TIPO DI COMBINAZIONE combinationType
    for (let i = 0; i < combinationLength; i ++) {
        const newAnswerInput = document.createElement('input');
        // newAnswerInput.type = 'number';
        // newAnswerInput.min = minNumber;
        // newAnswerInput.max = maxNumber;
        newAnswerInput.classList.add('form-control');
        answersInputGroupElement.appendChild(newAnswerInput);
    };
    answersFormElement.classList.remove('d-none');
};