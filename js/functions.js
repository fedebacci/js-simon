// COMMENTO NORMALE
// ! COMMENTO ERRORE
// ? COMMENTO DOMANDA
// * COMMENTO HIGHLIGHT
// # COMMENTO WARNING
// - COMMENTO TEXT
// todo COMMENTO TODO



/**
 * Funzione che fa iniziare il gioco
 * Imposta i valori da ricordare
 * Richiama la funzione per mostrare la combinazione da ricordare al giocatore e la funzione che fa partire il timer
 */
const startGame = () =>{
    console.debug('Game started');
    generateCombination(requestedNubers, maxNumber, minNumber);
    setRemainingTime();

    console.debug(numbers)
    showNumbers(numbers);
    startTimer();
}



/**
 * Funzione che genera la combinazione di numeri da ricordare, impedendo che si ripetano due numeri
 * @param {number} numbersToGenerate Quantitativo di numeri che la combinazione deve contenere
 * @param {number} maxNumberToGenerate Numero massimo che si può generare (COMPRESO)
 * @param {number} minNumberToGenerate Numero minimo che si può generare (COMPRESO)
 * @returns {Array<number>} Array contenente la combinazione generata
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
 * @param {Array<number>} numbersToShow Lista di numeri da ricordare da mostrare in pagina
 */
const showNumbers = (numbersToShow) => {

    // console.debug(numbersToShow);
    // console.debug(numbersListElement);

    numbersToShow.forEach(number => {
        const numberHTMLElement = document.createElement('div');
        numberHTMLElement.className = 'shownNumber d-flex justify-content-center align-items-center border border-1 border-dark-subtle rounded';
        numberHTMLElement.innerHTML = `
        <span>
            ${number}
        </span>
        `;
        numbersListElement.appendChild(numberHTMLElement);
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
    instructionsElement.innerText = `Inserisci i numeri (L'ordine non è importante)`
    answersFormElement.classList.remove('d-none');
};



/**
 * Funzione che riceve un array di numeri da mostrare sotto forma di stringa all'interno di un messaggio
 * @param {Array<number>} numbersToShow Lista di numeri da inserire nel messaggio. Possono essere i numeri da ricordare o i numeri ricordati correttamente
 * @returns {string} La stringa generata che contiene i numeri da mostrare
 */
const showNumbersString =  (numbersToShow) => {
    let string = "";
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
const validateUserAnswer =  () => {
    let isValid = true;
    let answerValues = [];
    errorMessageElement.innerText = "";
    let errorMSG = "";

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
const checkAnswer =  (numbers) => {

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
 * @param {number} number Valore inserito dall'utente per cui controllare la presenza nella combinazione
 * @returns {boolean} Valore che indica se il numero è presente nella combinazione iniziale
 */
const checkNumber =  (numbers, number) => {
    // console.debug(number);
    return numbers.includes(number);
};



/**
 * Funzione che riceve la lista di numeri indovinati e mostra all'utente un messaggio con un riepilogo
 * @param {Array<number>} correctGuesses Lista di numeri indovinati dall'utente
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
        setRemainingTime();
        numbers.length = 0;
        resetUserInterface();
        resetUserValues();
        resetResultsElement();
        startGame();
    });

    resultsElement.innerText = resultsMSG;
    resultsElement.appendChild(restartButton);
    resultsElement.classList.remove('d-none');
};



/**
 * Funzione che nasconde le istruzioni per l'utente e il form per l'inserimento delle risposte
 */
const hideUserInterface = () => {
    instructionsElement.classList.add('d-none');
    answersFormElement.classList.add('d-none');
}



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



const resetUserInterface = () => {
    numbersListElement.innerHTML = '';
    countdownElement.classList.remove('d-none');
    instructionsElement.classList.remove('d-none');
    numbersListElement.classList.remove('d-none');
};



const resetUserValues = () => {
    answerInputs.forEach(inputElement => {
        inputElement.value = "";
    });    
};



const setRemainingTime = () => {
    remainingTime = 3000;
};