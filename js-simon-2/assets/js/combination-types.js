// COMMENTO NORMALE
// ! COMMENTO ERRORE
// ? COMMENTO DOMANDA
// * COMMENTO HIGHLIGHT
// # COMMENTO WARNING
// - COMMENTO TEXT
// todo COMMENTO TODO



const combinationTypes = [
    {
        name: 'Numeri',
        value: 'numbers',
        description: "Ricorda una combinazione di numeri compresi tra 0 e il numero di opzioni possibili (che varia a seconda della difficoltà)",
        options: [],
    },
    {
        name: 'Lettere',
        value: 'letters',
        description: "Ricorda una combinazione di lettere. A seconda della difficoltà aumenta il numero di lettere da ricordare e puoi trovare parte dell'alfabeto in minuscolo, tutto l'alfabeto in minuscolo oppure tutto l'alfabeto sia in minuscolo che in maiuscolo",
        options: 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ',
    },
    {
        name: 'Colori',
        value: 'colors',
        description: "Ricorda una combinazione di colori. A seconda della difficoltà aumenta il numero di colori da ricordare e aumentano i colori possibili all'interno della combinazione",
        options: [
            '#8b0000',      // darkred       rgb(139, 0, 0)
            '#cd5c5c',      // indianred     rgb(205, 92, 92)
            '#ffff00',      // yellow        rgb(255, 255, 0)
            '#fffacd',      // lemonchiffon  rgb(255, 250, 205)
            '#0000ff',      // blue          rgb(0, 0, 255)
            '#add8e6',      // lightblue     rgb(173, 216, 230)
            '#008000',      // green         rgb(0, 128, 0)
            '#90ee90',      // lightgreen    rgb(144, 238, 144)
            '#00ff00',      // lime          rgb(50, 205, 50)
            '#964b00',      // brown         rgb(150, 75, 0)
            '#ffa500',      // orange        rgb(255, 165, 0)
            '#800080',      // purple        rgb(128, 0, 128)
            '#ff00ff',      // magenta       rgb(255, 0, 255)
            '#ffc0cb',      // pink          rgb(255, 192, 203)
            '#ff69b4',      // hotpink       rgb(255, 105, 180)
            '#000000',      // black         rgb(0, 0, 0)
            '#ffffff',      // white         rgb(255, 255, 255)
            '#808080',      // gray          rgb(128, 128, 128)
            '#d3d3d3',      // lightgray     rgb(211, 211, 211)
            '#deb887'       // burlywood     rgb(222, 184, 135)
        ]
    }
];