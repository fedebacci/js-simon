// COMMENTO NORMALE
// ! COMMENTO ERRORE
// ? COMMENTO DOMANDA
// * COMMENTO HIGHLIGHT
// # COMMENTO WARNING
// - COMMENTO TEXT
// todo COMMENTO TODO




/**
 * Funzione che fa iniziare il gioco
 * Richiama la funzione per mostrare la combinazione da ricordare al giocatore e la funzione che fa partire il timer
 * @param {Array<number>} numbers 
 */
const startGame = (numbers) =>{
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

    const generatedNumbers = [];

    while (generatedNumbers.length < numbersToGenerate) {
        const newNumber = generateRandomNumber(maxNumberToGenerate, minNumberToGenerate);
        if (generatedNumbers.includes(newNumber) === false) generatedNumbers.push(newNumber);
    }
    // console.debug(generatedNumbers);

    return generatedNumbers;
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
        console.debug("TEMPO SCADUTO");
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
 * Funzione che controlla i valori inseriti dall'utente
 */
const checkAnswer =  () => {
    // console.debug(answerInputs);

    const correctGuesses = [];

    answerInputs.forEach(input => {
        // console.debug(input.value);
        // console.debug(input.value.length);
        const currentValue = parseInt(input.value);
        // console.debug(currentValue);
        const isCorrect = checkNumber(currentValue);
        if (isCorrect) correctGuesses.push(currentValue)
    })

    console.debug(correctGuesses);

    showResults(correctGuesses);
};


/**
 * Funzione che controlla se il valore inserito dall'utente è presente nella combinazione
 * @param {number} number Valore inserito dall'utente per cui controllare la presenza nella combinazione
 * @returns {boolean} Valore che indica se il numero è presente nella combinazione iniziale
 */
const checkNumber =  (number) => {
    // console.debug(number);
    return numbers.includes(number);
};



/**
 * Funzione che riceve la lista di numeri indovinati e mostra all'utente un messaggio con un riepilogo
 * @param {Array<number>} correctGuesses Lista di numeri indovinati dall'utente
 */
const showResults =  (correctGuesses) => {
    if (correctGuesses.length === 0) {
        alert(`Non hai ricordato nessun numero!
I numeri da ricordare erano: ${showNumbersString(numbers)}`);
    } else if (correctGuesses.length === numbers.length) {
        alert(`Hai ricordato tutti e ${numbers.length} i numeri!
I numeri da ricordare erano: ${showNumbersString(numbers)}`);
    } else {
        alert(`Hai ricordato ${correctGuesses.length} numeri!
I numeri che hai ricordato sono: ${showNumbersString(correctGuesses)}
I numeri da ricordare erano: ${showNumbersString(numbers)}`);
    };
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



// todo: AGGIUNGERE LA VALIDAZIONE
// ? COME IMPEDIRE LA VALIDAZIONE AUTOMATICA DEL BROWSER?
// ? FORSE MODIFICANDO IL BOTTONE COME TYPE="BUTTON" E SPOSTANDO QUESTE AZIONI SUL LISTENER DI EVENTI "CLICK" DEL PULSANTE INVECE CHE SUL LISTENER "INPUT" DEL FORM
const validateUserAnswer =  () => {
    let isValid = true;
    let answerValues = [];
    let errorMSG = "";

    answerInputs.forEach(input => {
        console.debug(input);
        console.debug(input.value);
        console.debug(input.value.length);
        console.debug(parseInt(input.value));

        if (input.value.length === 0) {
            console.debug("Input vuoto");
            errorMSG += "Almeno un input è vuoto. Inserisci un numero in ciascun input.\n";
            isValid = false;
        };


        answerValues.includes(parseInt(input.value)) === false ? answerValues.push(parseInt(input.value)) : errorMSG += `Il numero ${input.value} si ripete. Inserisci un numero diverso in ciascun input.\n`;
    })

    console.debug(messageElement);
    console.debug(errorMSG);
    if (isValid === false) messageElement.innerText = errorMSG;

    return isValid;
};




// const funzione =  () => {

// };