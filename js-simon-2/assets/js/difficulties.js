// COMMENTO NORMALE
// ! COMMENTO ERRORE
// ? COMMENTO DOMANDA
// * COMMENTO HIGHLIGHT
// # COMMENTO WARNING
// - COMMENTO TEXT
// todo COMMENTO TODO


// # GENERALE, PENSO VADA GESTITA INVECE CON UN ARRAY DI DIFFICOLTA PER OGNI TIPO DI GIOCO (COMUNQUE TUTTE SIMILI A QUESTA)
// const difficulties = [
//     {
//         name: 'facile',
//         combinationLength: 3,
//         possibleOptions: 20,
//         time: 30000,
//     },
//     {
//         name: 'medio-facile',
//         combinationLength: 5,
//         possibleOptions: 20,
//         time: 20000,
//     },
//     {
//         name: 'Medio',
//         combinationLength: 5,
//         possibleOptions: 50,
//         time: 15000,
//     },
//     {
//         name: 'Medio difficile',
//         combinationLength: 7,
//         possibleOptions: 100,
//         time: 10000,
//     },
//     {
//         name: 'Difficile',
//         combinationLength: 7,
//         possibleOptions: 100,
//         time: 5000,
//     }
// ];



const numbersDifficulties = [
    {
        name: 'Facile (numeri)',
        value: 'easy',
        combinationLength: 3,
        possibleOptions: 20,
        time: 30000,
    },
    {
        name: 'Medio facile (numeri)',
        value: 'medium-easy',
        combinationLength: 5,
        possibleOptions: 20,
        time: 20000,
    },
    {
        name: 'Medio (numeri)',
        value: 'medium',
        combinationLength: 5,
        possibleOptions: 50,
        time: 15000,
    },
    {
        name: 'Medio difficile (numeri)',
        value: 'medium-hard',
        combinationLength: 7,
        possibleOptions: 100,
        time: 10000,
    },
    {
        name: 'Difficile (numeri)',
        value: 'hard',
        combinationLength: 7,
        possibleOptions: 100,
        time: 5000,
    }
];
const lettersDifficulties = [
    {
        name: 'Facile (lettere)',
        value: 'easy',
        combinationLength: 3,
        possibleOptions: 13,
        time: 30000,
    },
    {
        name: 'Medio facile (lettere)',
        value: 'medium-easy',
        combinationLength: 5,
        possibleOptions: 13,
        time: 20000,
    },
    {
        name: 'Medio (lettere)',
        value: 'medium',
        combinationLength: 5,
        possibleOptions: 26,
        time: 15000,
    },
    {
        name: 'Medio difficile (lettere)',
        value: 'medium-hard',
        combinationLength: 7,
        possibleOptions: 52,
        time: 10000,
    },
    {
        name: 'Difficile (lettere)',
        value: 'hard',
        combinationLength: 7,
        possibleOptions: 52,
        time: 5000,
    }
];
const colorsDifficulties = [
    {
        name: 'Facile (colori)',
        value: 'easy',
        combinationLength: 3,
        possibleOptions: 8,
        time: 30000,
    },
    {
        name: 'Medio facile (colori)',
        value: 'medium-easy',
        combinationLength: 5,
        possibleOptions: 8,
        time: 20000,
    },
    {
        name: 'Medio (colori)',
        value: 'medium',
        combinationLength: 5,
        possibleOptions: 12,
        time: 15000,
    },
    {
        name: 'Medio difficile (colori)',
        value: 'medium-hard',
        combinationLength: 7,
        possibleOptions: 20,
        time: 10000,
    },
    {
        name: 'Difficile (colori)',
        value: 'hard',
        combinationLength: 7,
        possibleOptions: 20,
        time: 5000,
    }
];