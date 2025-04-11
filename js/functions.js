// COMMENTO NORMALE
// ! COMMENTO ERRORE
// ? COMMENTO DOMANDA
// * COMMENTO HIGHLIGHT
// # COMMENTO WARNING
// - COMMENTO TEXT
// todo COMMENTO TODO



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
    console.debug(generatedNumbers);

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