// COMMENTO NORMALE
// ! COMMENTO ERRORE
// ? COMMENTO DOMANDA
// * COMMENTO HIGHLIGHT
// # COMMENTO WARNING
// - COMMENTO TEXT
// todo COMMENTO TODO



const showDifficultyOptions = () => {
    difficulties.forEach(difficulty => {
        const newDifficultyOptionElement = document.createElement('option');
        newDifficultyOptionElement.value = difficulty.name;
        newDifficultyOptionElement.innerText = convertDifficultyNameToString(difficulty.name);

        selectDifficulty.appendChild(newDifficultyOptionElement);
    });
};



/**
 * Funzione che converte il nome della difficoltà per la lettura da parte dell'utente
 * @param {string} name Nome originale della difficoltà da convertire
 * @returns {string} Nome della difficoltà da mostrare all'utente
 */
const convertDifficultyNameToString = (name) => {
    return name[0].toUpperCase() + name.replaceAll('-', ' ').slice(1)
}



/**
 * Funzione che riceve il nome della difficoltà attualmente selezionata dall'utente e ne mostra in pagina i dettagli come n° di elementi da ricordare, range dei numeri generati e tempo a disposizione convertito in secondi 
 * @param {string} difficultyName 
 */
const describeDifficulty = (difficultyName) => {
    const currentDifficulty = difficulties.find((difficulty) => difficulty.name === difficultyName);
    // console.debug(currentDifficulty);
    difficultyDescriptionElement.innerHTML = `
        <p class="mb-2 fw-bolder">
            Difficoltà selezionata: ${convertDifficultyNameToString(currentDifficulty.name)}
        </p>
        <p class="mb-2">
            Numeri generati: ${currentDifficulty.requestedNumbers}
        </p>
        <p class="mb-2">
            Range di numeri possibili: da ${currentDifficulty.minNumber} a ${currentDifficulty.maxNumber}
        </p>
        <p class="mb-0">
            Tempo a disposizione: ${currentDifficulty.time / 1000} secondi
        </p>
    `;
}



/**
 * Funzione che fa iniziare il gioco
 * Imposta la difficoltà scelta
 * Imposta i valori da ricordare
 * Richiama la funzione per mostrare la combinazione da ricordare al giocatore e la funzione che fa partire il timer
 */
const startGame = () =>{
    console.debug('Game started');

    const difficulty = setDifficultyLevel();

    hidePageElements();
    showGameScreen();
    generateCombination(requestedNumbers, maxNumber, minNumber);
    setRemainingTime(difficulty.time);

    console.debug(numbers);
    showNumbers(numbers);
    startTimer();
}



/**
 * Funzione che imposta le variabili del gioco a seconda della difficoltà scelta e ritorna l'oggetto contenente la difficoltà in modo da poterlo salvare per le successive partite (serve per settare il tempo rimanente)
 * @returns {object} Oggetto contenente la difficoltà scelta dall'utente
 */
const setDifficultyLevel = () => {
    const chosenDifficultyName = selectDifficultyElement.value;
    // console.debug(chosenDifficultyName);
    const chosenDifficulty = difficulties.find((difficulty) => difficulty.name === chosenDifficultyName);
    // console.debug(chosenDifficulty);

    requestedNumbers = chosenDifficulty.requestedNumbers;
    maxNumber = chosenDifficulty.maxNumber;
    minNumber = chosenDifficulty.minNumber;
    remainingTime = chosenDifficulty.remainingTime;

    return chosenDifficulty;
};




/**
 * Funzione che genera la combinazione di numeri da ricordare, impedendo che si ripetano due numeri
 * @param {number} numbersToGenerate Quantitativo di numeri che la combinazione deve contenere
 * @param {number} maxNumberToGenerate Numero massimo che si può generare (COMPRESO)
 * @param {number} minNumberToGenerate Numero minimo che si può generare (COMPRESO)
 * @returns {Array.<number>} Array contenente la combinazione generata
 */
const generateCombination = (numbersToGenerate, maxNumberToGenerate, minNumberToGenerate) => {
    // todo: CREARE UN CONTROLLO (CHE NON DOVREBBE SERVIRE) PER FAR TERMINARE IL WHILE IN CASO I NUMERI RICHIESTI ECCEDANO I NUMERI A DISPOSIZIONE (ES: Richiedo 5 numeri compresi tra 1 e 4)
    // let iterations = 0;

    while (numbers.length < numbersToGenerate) {
        const newNumber = generateRandomNumber(maxNumberToGenerate, minNumberToGenerate);
        if (numbers.includes(newNumber) === false) numbers.push(newNumber);
    };
};



/**
 * Funzione che genera un numero casuale in un range, COMPRESI il numero massimo e il numero minimo indicati
 * @param {number} max Numero massimo che si può generare (COMPRESO)
 * @param {number} min Numero minimo che si può generare (COMPRESO)
 * @returns {number} Numero randomico generato
 */
const generateRandomNumber = (max, min) => {
    return Math.floor(Math.random() * (max - min + 1)) + min;
};



/**
 * Funzione che riceve la lista di numeri da ricordare e la inserisce nella pagina
 * @param {Array.<number>} numbersToShow Lista di numeri da ricordare da mostrare in pagina
 */
const showNumbers = (numbersToShow) => {

    // console.debug(numbersToShow);
    // console.debug(numbersListElement);

    numbersToShow.forEach(number => {
        const numberListElement = document.createElement('li');
        numberListElement.className = 'shownNumber border border-1 border-dark-subtle rounded';
        numberListElement.innerHTML = `
        <div class="d-flex justify-content-center align-items-center h-100">
            ${number}
        </div>
        `;
        numbersListElement.appendChild(numberListElement);
    });
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
 * Funzione che mostra sullo schermo il tempo rimanente
 */
const showTimeLeft = () => {
    countdownElement.innerText = remainingTime / 1000;
}



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



/**
 * Funzione che nasconde il countdown e i numeri da ricordare
 */
const hideCountdown =  () => {
    countdownElement.classList.add('d-none');
    numbersListElement.classList.add('d-none');
};



/**
 * Funzione che modifica le istruzioni e mostra all'utente il form per inserire i numeri che si ricordano
 */
const showAnswersForm =  () => {
    instructionsElement.innerText = `Inserisci i numeri (L'ordine non è importante)`;
    for (let i = 0; i < requestedNumbers; i ++) {
        const newAnswerInput = document.createElement('input');
        newAnswerInput.type = 'number';
        newAnswerInput.min = minNumber;
        newAnswerInput.max = maxNumber;
        newAnswerInput.classList.add('form-control');
        answersInputGroupElement.appendChild(newAnswerInput);
    };
    answersFormElement.classList.remove('d-none');
};



/**
 * Funzione che riceve un array di numeri da mostrare sotto forma di stringa all'interno di un messaggio
 * @param {Array.<number>} numbersToShow Lista di numeri da inserire nel messaggio. Possono essere i numeri da ricordare o i numeri ricordati correttamente
 * @returns {string} La stringa generata che contiene i numeri da mostrare
 */
const showNumbersString =  (numbersToShow) => {
    let string = "";
    // todo: USARE METODO join
    numbersToShow.forEach(number => {
        string.length === 0 ? string = number : string = `${string}, ${number}`
    })
    return string;
};



/**
 * Funzione che controlla che i valori inseriti dall'utente siano valori numerici non duplicati compresi tra il numero massimo e il numero minimo
 * Controlla quindi che i valori non siano vuoti, non contengano caratteri, non siano inseriti due volte, non siano maggiori del valore massimo e non siano inferiori al valore minimo
 * @returns {boolean} Valore che indica se tutti i valori inseriti dall'utente sono accettabili e se è possibile procedere al confronto con i valori generati
 */
const validateUserAnswer =  (answerInputs) => {
    let isValid = true;
    let answerValues = [];
    errorMessageElement.innerText = "";
    let errorMSG = "";

    // console.debug(answerInputs);
    answerInputs.forEach(inputElement => {

        // console.debug(inputElement);
        // console.debug(inputElement.value);
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
    })

    // console.debug(errorMessageElement);
    // console.debug(errorMSG);
    if (isValid === false) errorMessageElement.innerText = errorMSG;
    return isValid;
};



/**
 * Funzione che segnala un input erroneo aggiungendo la classe di Bootstrap .border-danger
 * @param {input} input Elemento HTML da segnalare come erroneo
 */
const setErrorInput = (input) => {
    input.classList.add('border-danger');
};



/**
 * Funzione che controlla i valori inseriti dall'utente (Lanciata solo se la validazione lo permette)
 * Richiama la funzione per mostrare il risultato e la funzione per nascondere gli input dell'utente.
 */
const checkAnswer =  (answerInputs, numbers) => {

    // console.debug(answerInputs);

    const correctGuesses = [];

    answerInputs.forEach(inputElement => {
        // console.debug(inputElement.value);
        // console.debug(inputElement.value.length);
        const currentValue = parseInt(inputElement.value);
        // console.debug(currentValue);
        const isCorrect = checkNumber(numbers, currentValue);
        if (isCorrect) correctGuesses.push(currentValue)
    })

    // console.debug(correctGuesses);
    showResults(correctGuesses);
    hideUserInterface();
};



/**
 * Funzione che controlla se il valore inserito dall'utente è presente nella combinazione
 * @param {Array.<number>} numbers La combinazione da ricordare
 * @param {number} number Valore inserito dall'utente per cui controllare la presenza nella combinazione
 * @returns {boolean} Valore che indica se il numero è presente nella combinazione iniziale
 */
const checkNumber =  (numbers, number) => {
    // console.debug(number);
    return numbers.includes(number);
};



/**
 * Funzione che riceve la lista di numeri indovinati e mostra all'utente un messaggio con un riepilogo
 * Genera anche il pulsante per iniziare una nuova partita ed il pulsante per tornare alla schermata principale
 * @param {Array.<number>} correctGuesses Lista di numeri indovinati dall'utente
 */
const showResults =  (correctGuesses) => {
    let resultsMSG = ""
    if (correctGuesses.length === 0) {
        resultsMSG = `Non hai ricordato nessun numero!
I numeri da ricordare erano: ${showNumbersString(numbers)}`;
        resultsElement.classList.add('bg-danger', 'text-bg-danger');
    } else if (correctGuesses.length === numbers.length) {
        resultsMSG = `Hai ricordato tutti e ${numbers.length} i numeri!
I numeri da ricordare erano: ${showNumbersString(numbers)}`;
        resultsElement.classList.add('bg-success', 'text-bg-success');
    } else {
        resultsMSG = `Hai ricordato ${correctGuesses.length} numeri su ${numbers.length}!
I numeri che hai ricordato sono: ${showNumbersString(correctGuesses)}
I numeri da ricordare erano: ${showNumbersString(numbers)}`;
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

    resultsElement.innerText = resultsMSG;
    resultsElement.appendChild(restartButton);
    resultsElement.appendChild(backButton);
    resultsElement.classList.remove('d-none');
};



/**
 * Funzione che resetta i parametri di gioco
 * Richiama la funzione che resetta il tempo rimanente, riazzera la combinazione da ricordare, richiama la funzione che resetta l'interfaccia per la risposta dell'utente, richiama la funzione che resetta i valori inseriti dall'utente, richiama la funzione che resetta e nasconde i risultati
 */
const resetGameData = () => {
    setRemainingTime();
    numbers.length = 0;
    resetUserInterface();
    resetUserValues();
    resetResultsElement();
}



/**
 * Funzione che nasconde le istruzioni per l'utente e il form per l'inserimento delle risposte
 */
const hideUserInterface = () => {
    instructionsElement.classList.add('d-none');
    answersFormElement.classList.add('d-none');
}



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
 * Funzione che resetta l'interfaccia per la risposta dell'utente
 * Rimuove i blocchi contenenti la combinazione da ricordare
 * Mostra il blocco contenente il countdown
 * Mostra il blocco contenente le istruzioni di gioco per l'utente
 * Mostra il blocco che conterrà i nuovi numeri generati
 */
const resetUserInterface = () => {
    numbersListElement.innerHTML = '';
    countdownElement.classList.remove('d-none');
    instructionsElement.classList.remove('d-none');
    numbersListElement.classList.remove('d-none');
};



/**
 * Funzione che rimuove gli input per l'inserimento dei valori da parte dell'utente
 */
const resetUserValues = () => {
    answersInputGroupElement.innerHTML = ""; 
};



/**
 * Funzione che riceve il tempo a disposizione da impostare a seconda della difficoltà e lo resetta
 * @param {number} timeToSet Numero di millisecondi a disposizione dell'utente per ricordare la combinazione
 */
const setRemainingTime = (timeToSet) => {
    // console.debug(timeToSet);
    remainingTime = timeToSet;
};