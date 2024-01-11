// I puntatori
const grill = document.getElementById('grill');
const form = document.querySelector('form');
const button = document.querySelector('button');
const score = document.querySelector('.score'); 

const select = document.getElementById('level');



//! TODO cercare come si puo' modificare il foglio CSS
const numberCol = document.querySelector('root');

const getNumberCell = () =>{
    

    switch (select.value){
        case '2':
            row = 9;
            col = 9;
            
            break;
        case '3':
            row = 7;
            col = 7;
            break
    
    }
    let numberCell = row * col;
    return numberCell;
}
    
let row = 2;
let col = 2;
let numberCell = row * col;
let numberBombs = 2;

let secureCells = numberCell - numberBombs; 


const getCell = (num) =>{
    
    const cell = document.createElement('div');
    cell.className = 'cell';
    cell.innerText = num;
    
    return cell;
} 

const getBombs = numCell =>{
    
    const bomb = [];
    while(bomb.length < numberBombs){
        let randomNumber = Math.floor(Math.random() * numCell)+1;
        if(!bomb.includes(randomNumber)) bomb.push(randomNumber);
    }
    return bomb;
}


const endGame = () =>{
    const cells = document.querySelectorAll('.cell');

    for(let cell of cells){
        cell.classList.add('click');
    }
   
}

// evento che parte al click del bottone
form.addEventListener('submit', (event) =>{
    event.preventDefault();

    //pulire tutto quello che c'e' all'interno cosi' non c'e' uno spam di griglie
    grill.innerHTML = ''; 

    let numberScore = 0;

    
    
    button.innerText = ('Rigioca');

    // funzione per calcolare il numero di celle in base al livello di difficolta'
    const numberCell = getNumberCell();

    // funzione che mi da un array di numeri COMPRESI nella griglia NON ripetuti
    const bombs = getBombs(numberCell);

    console.log(bombs)

    //cliclo FOR che serve a creare la griglia
    for (i = 1 ; i <= numberCell ; i++){
        //chiamo la funzione per la creazione delle celle 
        const grid = getCell(i);

        //quando click sulla cella aggiungo la classe 
        grid.addEventListener('click', () =>{
            
            if(!grid.className.includes('click')){
                grid.classList.add('click');
                if(bombs.includes(parseInt(grid.innerText))){
                    grid.classList.add('bomb');
                    endGame();
                    console.log('partita finita')
                }else {
                ++numberScore;
                score.innerText = ('Il tuo punteggio: ' + numberScore)
                }
            }

            if(numberScore === secureCells){
                endGame();
                console.log('partita finita, Hai vinto')
            }
            
        })
        
        
        
        //stampiamo il risultato
        grill.appendChild(grid);
    }
    

})
