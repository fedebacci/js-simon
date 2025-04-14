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
    console.debug('combinationType', combinationType);
    console.debug('difficulty', difficulty);

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
    // console.debug('combinationType', combinationType);
    // console.debug('difficulty', difficulty);

    while (combination.length < combinationLength) {
        let newElement;
        if (combinationType.value === 'numbers') {
            newElement = generateRandomNumber(1, difficulty.possibleOptions);
        } else {
            newElement = generateRandomElement(0, difficulty.possibleOptions - 1);
        }
        // todo: CONTROLLARE FUNZIONE CHE FORSE GENERA VALORI UNDEFINED (VISTO PER I COLORI)
        if (combination.includes(newElement) === false && newElement !== undefined) combination.push(newElement);
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




// ! FUNZIONI PER LA GESTIONE DEGLI INPUT COLORATI
const focusFakeInput = (fakeInputToFocus) => {
    const otherFocused = document.querySelector('.focused');
    // console.debug(otherFocused);
    if (otherFocused) {
        otherFocused.classList.remove('focused');
        otherFocused.classList.add('border');
    }
    if (fakeInputToFocus.classList.contains('border-danger')) fakeInputToFocus.classList.remove('border-danger');
    fakeInputToFocus.classList.add('focused');
    fakeInputToFocus.classList.remove('border');
};
const selectThisColor = (colorToSelect) => {
    // console.debug(colorToSelect);
    const selectedFakeInputContainer = document.querySelector('.focused');
    // console.debug(selectedFakeInputContainer);
    if (!selectedFakeInputContainer) return;

    // const selectedFakeInput = document.querySelector('.focused > .answerFakeInput');
    const selectedFakeInput = selectedFakeInputContainer.querySelector('.answerFakeInput');
    // console.debug(selectedFakeInput);

    if (!selectedFakeInput) return;

    selectedFakeInput.style.backgroundColor = colorToSelect;
    const corrispondingInput = document.querySelector('.focused + input');
    corrispondingInput.value = rgbToHex(colorToSelect);
    // console.debug(corrispondingInput);
    // console.debug(corrispondingInput.value);

    selectedFakeInputContainer.classList.remove('focused');
    corrispondingInput.classList.add('inserted');
    selectedFakeInputContainer.classList.add('inserted');
};
const rgbToHex = (colorToConvert) => {
    // console.debug("colorToConvert", colorToConvert);
    if(colorToConvert.charAt(0) === 'r') {
        colorToConvert = colorToConvert.replace('rgb(','').replace(')','').split(',');
        var r = parseInt(colorToConvert[0], 10).toString(16);
        var g = parseInt(colorToConvert[1], 10).toString(16);
        var b = parseInt(colorToConvert[2], 10).toString(16);
        r = r.length === 1 ? '0' + r : r; 
        g = g.length === 1 ? '0' + g : g; 
        b = b.length === 1 ? '0' + b : b;
        var colorToConvertHex = '#' + r + g + b;
        // console.debug("colorToConvertHex:", colorToConvertHex)
        return colorToConvertHex;
    }
};



/**
 * Funzione che controlla che i valori inseriti dall'utente siano valori numerici non duplicati compresi tra il numero massimo e il numero minimo
 * Controlla quindi che i valori non siano vuoti, non contengano caratteri, non siano inseriti due volte, non siano maggiori del valore massimo e non siano inferiori al valore minimo
 * @returns {boolean} Valore che indica se tutti i valori inseriti dall'utente sono accettabili e se è possibile procedere al confronto con i valori generati
 */
const validateUserAnswer =  (answerInputs) => {

    if (combinationType.value === 'numbers') {
        isValid = validateNumbersCombination(answerInputs, 1, difficulty.possibleOptions);
    } else if (combinationType.value === 'letters') {
        isValid = validateLettersCombination(answerInputs);
    } else {
        isValid = validateColorsCombination(answerInputs);
    }
    
    // ! DEBUG
    // answerInputs.forEach(inputElement => {
    //     console.debug(inputElement);
    //     console.debug(inputElement.value);
    // })
    
    console.warn(isValid);
    return isValid;
};
const validateNumbersCombination = (inputsToValidate, minNumber, maxNumber) => {
    // console.debug(inputsToValidate);
    // todo: CAPIRE COSA SI PUO PORTARE FUORI NELLA FUNZIONE validateUserAnswer
    let isValid = true;
    let answerValues = [];
    errorMessageElement.innerText = "";
    let errorMSG = "";

    inputsToValidate.forEach(inputElement => {
        // console.debug(inputElement.value.length);
        // console.debug(parseInt(inputElement.value));

        switch(true) {
            case inputElement.value.length === 0:
                isValid = false;
                errorMSG += "Almeno un input è vuoto o contiene un valore non numerico. Inserisci un numero in ciascun input.\n";
                setErrorInput(inputElement);
                // inputElement.value = minNumber;
                break;
            case parseInt(inputElement.value) < minNumber:
                isValid = false;
                errorMSG += `Il numero ${inputElement.value} è minore del numero minimo: ${minNumber}. Inserisci un numero maggiore o uguale a ${minNumber}.\n`;
                setErrorInput(inputElement);
                // input.value = minNumber;
                break;  
            case parseInt(inputElement.value) > maxNumber:
                isValid = false;
                errorMSG += `Il numero ${inputElement.value} è maggiore del numero massimo: ${maxNumber}. Inserisci un numero minore o uguale a ${maxNumber}.\n`;
                setErrorInput(inputElement);
                // input.value = maxNumber;
                break;  
            case answerValues.includes(parseInt(inputElement.value)) === true:
                isValid = false;
                errorMSG += `Il numero ${inputElement.value} si ripete. Inserisci un numero diverso in ciascun input.\n`;
                setErrorInput(inputElement);
                break;
            default:
                if (inputElement.classList.contains('border-danger')) inputElement.classList.remove('border-danger');
                answerValues.push(parseInt(inputElement.value));
                break;  
        };
    });

    // console.debug(errorMessageElement);
    // console.debug(errorMSG);
    if (isValid === false) errorMessageElement.innerText = errorMSG;
    return isValid;
};

const validateLettersCombination = (inputsToValidate) => {
    console.debug(inputsToValidate);
    // todo: CAPIRE COSA SI PUO PORTARE FUORI NELLA FUNZIONE validateUserAnswer
    let isValid = true;
    let answerValues = [];
    errorMessageElement.innerText = "";
    let errorMSG = "";

    inputsToValidate.forEach(inputElement => {
        // console.debug(inputElement.value);
        // console.debug(answerValues);
        // console.debug(inputElement.value.length);
        // console.debug(parseInt(inputElement.value));

        switch(true) {
            case inputElement.value.length === 0:
                isValid = false;
                errorMSG += "Almeno un input è vuoto. Inserisci una lettera in ciascun input.\n";
                setErrorInput(inputElement);
                break;
            case inputElement.value.length > 1:
                isValid = false;
                errorMSG += "Almeno un input contiene più caratteri. Inserisci una lettera in ciascun input.\n";
                setErrorInput(inputElement);
                break;
            case !isNaN(parseInt(inputElement.value)):
                isValid = false;
                errorMSG += `Un input contiene il numero ${inputElement.value} al posto di una lettera! Inserisci una lettera in ciascun input.\n`;
                setErrorInput(inputElement);
                break;  
            case answerValues.includes(inputElement.value) === true:
                isValid = false;
                errorMSG += `La lettera ${inputElement.value} si ripete. Inserisci una lettera diversa in ciascun input.\n`;
                setErrorInput(inputElement);
                break;
            default:
                if (inputElement.classList.contains('border-danger')) inputElement.classList.remove('border-danger');
                answerValues.push(inputElement.value);
                break;  
        };
    });

    // console.debug(errorMessageElement);
    // console.debug(errorMSG);
    if (isValid === false) errorMessageElement.innerText = errorMSG;
    return isValid;
};
const validateColorsCombination = (inputsToValidate) => {
    console.debug(inputsToValidate);
    // todo: CAPIRE COSA SI PUO PORTARE FUORI NELLA FUNZIONE validateUserAnswer
    let isValid = true;
    let answerValues = [];
    errorMessageElement.innerText = "";
    let errorMSG = "";

    inputsToValidate.forEach(inputElement => {
        // console.debug(answerValues);
        // console.debug(inputElement.value);
        // console.debug(inputElement.value.length);
        // console.debug(parseInt(inputElement.value));

        switch(true) {
            case !inputElement.classList.contains('inserted'):
                isValid = false;
                errorMSG += "Almeno un input è vuoto. Inserisci un colore in ciascun input.\n";
                // console.debug('inputElement', inputElement)
                setErrorInput(inputElement);
                break;
            case answerValues.includes(inputElement.value) === true:
                isValid = false;
                errorMSG += `Un colore si ripete. Inserisci un colore diverso in ciascun input.\n`;
                setErrorInput(inputElement);
                break;
            default:
                if (inputElement.classList.contains('border-danger')) inputElement.classList.remove('border-danger');
                answerValues.push(inputElement.value);
                break;  
        };
    });

    // console.debug(errorMessageElement);
    // console.debug(errorMSG);
    if (isValid === false) errorMessageElement.innerText = errorMSG;
    return isValid;
};



/**
 * Funzione che controlla i valori inseriti dall'utente (Lanciata solo se la validazione lo permette)
 * Richiama la funzione per mostrare il risultato e la funzione per nascondere gli input dell'utente.
 */
const checkAnswer =  (answerInputs, combination) => {

    // console.debug(answerInputs);

    const correctGuesses = [];
    const wrongGuesses = [];

    // console.debug("combination", combination);

    answerInputs.forEach(inputElement => {
        // console.debug(inputElement.value);
        // console.debug(inputElement.value.length);
        let currentValue = inputElement.value;
        if (combinationType.value === 'numbers') currentValue = parseInt(currentValue);
        // console.debug("currentValue", currentValue);
        const isCorrect = checkValue(combination, currentValue);
        isCorrect === true ? correctGuesses.push(currentValue) : wrongGuesses.push(currentValue);
    })

    console.debug("combination", combination);
    console.debug("correctGuesses", correctGuesses);
    console.debug("wrongGuesses", wrongGuesses);
    showResults(correctGuesses, wrongGuesses);
    hideUserInterface();
};
const checkValue =  (combination, value) => {
    // console.debug(value);
    return combination.includes(value);
};



/**
 * Funzione che resetta i parametri di gioco
 * Richiama la funzione che resetta il tempo rimanente, riazzera la combinazione da ricordare, richiama la funzione che resetta l'interfaccia per la risposta dell'utente, richiama la funzione che resetta i valori inseriti dall'utente, richiama la funzione che resetta e nasconde i risultati
 */
const resetGameData = () => {
    setRemainingTime();
    combination.length = 0;
    resetUserInterface();
    resetUserValues();
    resetResultsElement();
}




























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

    for (let i = 0; i < combinationLength; i ++) {
        const newAnswerInput = document.createElement('input');

        if (combinationType.value === 'numbers') {
            newAnswerInput.type = 'number';
            newAnswerInput.min = 1;
            newAnswerInput.max = difficulty.possibleOptions;
            newAnswerInput.classList.add('form-control');
        } else if (combinationType.value === 'letters') {
            newAnswerInput.type = 'text';
            newAnswerInput.classList.add('form-control');
        } else {
            newAnswerInput.type = 'color';
            // ! DATA-ID NON SERVE PER L'INSERIMENTO DEL COLORE
            // ? FORSE INVECE MI SERVE PER MOSTRARE QUALE FAKE INPUT E SBAGLIATO NELLA VALIDAZIONE
            newAnswerInput.dataset.id = i + 1;
            newAnswerInput.classList.add('d-none');
            const newAnswerFakeInputContainer = document.createElement('div');
            newAnswerFakeInputContainer.className = 'border rounded p-1';
            // ! DATA-ID NON SERVE PER L'INSERIMENTO DEL COLORE
            // ? FORSE INVECE MI SERVE PER MOSTRARE QUALE FAKE INPUT E SBAGLIATO NELLA VALIDAZIONE
            newAnswerFakeInputContainer.dataset.id = i + 1;
            const newAnswerFakeInput = document.createElement('div');
            newAnswerFakeInput.className = 'answerFakeInput border rounded';
            // ! DATA-ID NON SERVE PER L'INSERIMENTO DEL COLORE
            // ? FORSE INVECE MI SERVE PER MOSTRARE QUALE FAKE INPUT E SBAGLIATO NELLA VALIDAZIONE, MA PER IL CONTAINER
            // newAnswerFakeInput.dataset.id = i + 1;
            newAnswerFakeInputContainer.appendChild(newAnswerFakeInput);
            answersInputGroupElement.appendChild(newAnswerFakeInputContainer);
            answersInputGroupElement.appendChild(newAnswerInput);
            newAnswerFakeInputContainer.addEventListener('click', function (e) {
                focusFakeInput(e.target);
            });
        };

        answersInputGroupElement.appendChild(newAnswerInput);
    };

    if (combinationType.value === 'colors') showColorsOptions();
    answersFormElement.classList.remove('d-none');
};




// ! FUNZIONI PER LA GESTIONE DEGLI INPUT COLORATI
const showColorsOptions = () => {
    // console.debug(difficulty.possibleOptions);
    for (let i = 0; i < difficulty.possibleOptions; i ++) {
        const newColorOption = document.createElement('div');
        newColorOption.className = 'colorOption border rounded';
        newColorOption.style.backgroundColor = combinationType.options[i];
        // console.debug("newColorOption.style.backgroundColor", newColorOption.style.backgroundColor);

        newColorOption.addEventListener('click', function (e) {
            selectThisColor(e.target.style.backgroundColor);
        });
        colorsOptionsElement.appendChild(newColorOption);
    }
    colorsOptionsElement.classList.remove('d-none');
};



/**
 * Funzione che segnala un input erroneo aggiungendo la classe di Bootstrap .border-danger
 * @param {input} input Elemento HTML da segnalare come erroneo
 */
const setErrorInput = (input) => {
    // console.debug("input erroneo:", input);
    // console.debug("combinationType", combinationType);
    if (combinationType.value === 'colors') {
        const correspondingFakeInput = document.querySelector(`[data-id="${input.dataset.id}"`);
        console.debug("correspondingFakeInput", correspondingFakeInput);
        correspondingFakeInput.classList.remove('inserted');
        correspondingFakeInput.classList.add('border');
        correspondingFakeInput.classList.add('border-danger');
        input.classList.remove('inserted');
    } else {
        input.classList.add('border-danger');
    }
};



/**
 * Funzione che nasconde le istruzioni per l'utente e il form per l'inserimento delle risposte
 */
const hideUserInterface = () => {
    instructionsElement.classList.add('d-none');
    answersFormElement.classList.add('d-none');
}






const showResults =  (correctGuesses, wrongGuesses) => {
    
    if (combinationType.value !== 'colors') {
        let resultsMSG = "";
        if (correctGuesses.length === 0) {
            resultsMSG = `<h5 class="mb-3">Non hai ricordato niente!</h5>
                <p class="mb-0">Gli elementi che hai inserito sono: <span id="wrongGuessesElement">${showElementsString(wrongGuesses, "wrongGuessesElement")}</span></p>
                <p class="mb-0">La combinazione da ricordare era: <span id="originalCombinationElement">${showElementsString(combination, "originalCombinationElement")}</span></p>
            `;
        } else if (correctGuesses.length === combination.length) {
            resultsMSG = `<h5 class="mb-3">Hai ricordato tutto!</h5>
                <p class="mb-0">La combinazione da ricordare era: <span id="originalCombinationElement">${showElementsString(combination, "originalCombinationElement")}</span></p>
            `;
        } else {
            resultsMSG = `<h5 class="mb-3">Hai ricordato ${correctGuesses.length} elementi su ${combination.length}</h5>
                <p class="mb-0">Gli elementi che hai indovinato sono: <span id="correctGuessesElement">${showElementsString(correctGuesses, "correctGuessesElement")}</span></p>
                <p class="mb-0">Gli elementi che hai sbagliato sono: <span id="wrongGuessesElement">${showElementsString(wrongGuesses, "wrongGuessesElement")}</span></p>
                <p class="mb-0">La combinazione da ricordare era: <span id="originalCombinationElement">${showElementsString(combination, "originalCombinationElement")}</span></p>
            `;
        };
        resultsElement.innerHTML = resultsMSG;
    } else {
        if (correctGuesses.length === 0) {
            resultsMSG = `<h5 class="mb-3">Non hai ricordato niente!</h5>
                <p class="mb-2 d-flex align-items-center">Gli elementi che hai inserito sono: <span class="d-flex align-items-center" id="wrongGuessesElement"></span></p>
                <p class="mb-0 d-flex align-items-center">La combinazione da ricordare era: <span class="d-flex align-items-center" id="originalCombinationElement"></span></p>
            `;
            resultsElement.innerHTML = resultsMSG;
            showElementsString(wrongGuesses, "wrongGuessesElement");
            showElementsString(combination, "originalCombinationElement");
        } else if (correctGuesses.length === combination.length) {
            resultsMSG = `<h5 class="mb-3">Hai ricordato tutto!</h5>
                <p class="mb-0 d-flex align-items-center">La combinazione da ricordare era: <span class="d-flex align-items-center" id="originalCombinationElement"></span></p>
            `;
            showElementsString(combination, "originalCombinationElement");
            resultsElement.innerHTML = resultsMSG;
        } else {
            resultsMSG = `<h5 class="mb-3">Hai ricordato ${correctGuesses.length} elementi su ${combination.length}</h5>
                <p class="mb-2 d-flex align-items-center">Gli elementi che hai indovinato sono: <span class="d-flex align-items-center" id="correctGuessesElement"></span></p>
                <p class="mb-2 d-flex align-items-center">Gli elementi che hai sbagliato sono: <span class="d-flex align-items-center" id="wrongGuessesElement"></span></p>
                <p class="mb-0 d-flex align-items-center">La combinazione da ricordare era: <span class="d-flex align-items-center" id="originalCombinationElement"></span></p>
            `;
            resultsElement.innerHTML = resultsMSG;
            showElementsString(correctGuesses, "correctGuessesElement");
            showElementsString(wrongGuesses, "wrongGuessesElement");
            showElementsString(combination, "originalCombinationElement");
        };
    };


    if (correctGuesses.length === 0) {
        resultsElement.classList.add('bg-danger', 'text-bg-danger');
    } else if (correctGuesses.length === combination.length) {
        resultsElement.classList.add('bg-success', 'text-bg-success');
    } else {
        resultsElement.classList.add('bg-success-subtle');
    };


    const restartButton = document.createElement('button');
    restartButton.className = 'btn btn-primary mt-2 d-block mx-auto';
    restartButton.innerText = 'Nuova partita';
    restartButton.addEventListener('click', function() {
        resetGameData();
        startGame();
    });
    const backButton = document.createElement('button');
    backButton.className = 'btn btn-light mt-2 d-block mx-auto';
    backButton.innerText = 'Torna alla schermata principale';
    backButton.addEventListener('click', function() {
        resetGameData();
        showPageElements();
        hideGameScreen();
    });

    resultsElement.appendChild(restartButton);
    resultsElement.appendChild(backButton);
    resultsElement.classList.remove('d-none');
};

const showElementsString =  (elementsToShow, parentID) => {
    console.debug("elementsToShow", elementsToShow);
    console.debug("parentID", parentID);

    if (combinationType.value !== 'colors') {
        return elementsToShow.join(", ");
    } else {
        // Elemento HTML in cui appendere gli elementi
        const parentElement = document.getElementById(parentID);

        elementsToShow.forEach(element => {
            const elementContainer = document.createElement('span');
            elementContainer.className = 'resultElementContainer border me-1';
            elementContainer.innerHTML = `
            <div class="h-100 border" style="background-color: ${element}">
            </div>
            `
            parentElement.appendChild(elementContainer);
        });
        // return;
    };
};



/**
 * Funzione che resetta l'interfaccia per la risposta dell'utente
 * Rimuove i blocchi contenenti la combinazione da ricordare
 * Mostra il blocco contenente il countdown
 * Mostra il blocco contenente le istruzioni di gioco per l'utente
 * Mostra il blocco che conterrà i nuovi numeri generati
 */
const resetUserInterface = () => {
    combinationListElement.innerHTML = '';
    countdownElement.classList.remove('d-none');
    instructionsElement.classList.remove('d-none');
    combinationListElement.classList.remove('d-none');
};



/**
 * Funzione che rimuove gli input per l'inserimento dei valori da parte dell'utente
 */
const resetUserValues = () => {
    if (!colorsOptions.classList.contains('d-none')) {
        colorsOptions.classList.add('d-none');
        colorsOptions.innerHTML = "";
    }
        
    answersInputGroupElement.innerHTML = ""; 
};



/**
 * Funzione che nasconde il blocco contenente i risultati e cancella le classi per lo stile presenti
 */
const resetResultsElement = () => {
    resultsElement.classList.add('d-none');
    if (resultsElement.classList.contains('bg-danger')) {
        resultsElement.classList.remove('bg-danger');
        resultsElement.classList.remove('text-bg-danger');
    };
    if (resultsElement.classList.contains('bg-success')) {
        resultsElement.classList.remove('bg-success');
        resultsElement.classList.remove('text-bg-success');
    };
    if (resultsElement.classList.contains('bg-success-subtle')) resultsElement.classList.remove('bg-success-subtle');
};



/**
 * Funzione che riceve il nome della difficoltà attualmente selezionata dall'utente e ne mostra in pagina i dettagli come n° di elementi da ricordare, range dei numeri generati e tempo a disposizione convertito in secondi 
 */
const describeDifficulty = () => {
    difficultyDescriptionElement.innerHTML = `
        <p class="mb-2 fw-bolder">
            Difficoltà selezionata: ${difficulty.name}
        </p>
        <p class="mb-2">
            Lunghezza della combinazione da ricordare: ${difficulty.combinationLength}
        </p>
        <p class="mb-2">
            Opzioni possibili: ${difficulty.possibleOptions}
        </p>
        <p class="mb-0">
            Tempo a disposizione: ${difficulty.time / 1000} secondi
        </p>
    `;
}




/**
 * Funzione che descrive il tipo di gioco scelto
 */
const describeCombinationType = () => {
    combinationTypeDescription.innerText = combinationType.description;
}